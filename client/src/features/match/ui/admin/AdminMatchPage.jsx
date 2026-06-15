import { useMemo, useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import {
  createMatch,
  deleteMatch,
  getMatchList,
  getMatchSeriesList,
  getMatchTeamList,
  updateMatch,
} from "../../api/matchApi";

const STATUS_OPTIONS = [
  "DRAFT",
  "UPCOMING",
  "TOSS_COMPLETED",
  "PLAYING_XI_SELECTED",
  "LIVE",
  "INNINGS_BREAK",
  "COMPLETED",
];

const getApiMessage = (error, fallback) =>
  error?.response?.data?.message || error?.message || fallback;

const getId = (value) => (typeof value === "object" ? value?._id : value);
const getName = (value, fallback = "Not selected") =>
  typeof value === "object"
    ? value?.shortName || value?.name || fallback
    : fallback;

const toDatetimeLocal = (value) => {
  if (!value) return "";
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  const offsetDate = new Date(
    date.getTime() - date.getTimezoneOffset() * 60000,
  );
  return offsetDate.toISOString().slice(0, 16);
};

const formatMatchTime = (value) => {
  if (!value) return "Time not set";
  return new Intl.DateTimeFormat("en-IN", {
    dateStyle: "medium",
    timeStyle: "short",
  }).format(new Date(value));
};

const AdminMatchPage = () => {
  const queryClient = useQueryClient();
  const [editingMatch, setEditingMatch] = useState(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      seriesId: "",
      matchNumber: "",
      venue: "",
      startTime: "",
      status: "UPCOMING",
      team1: "",
      team2: "",
    },
  });

  const matchesQuery = useQuery({
    queryKey: ["matches"],
    queryFn: getMatchList,
  });

  const teamsQuery = useQuery({
    queryKey: ["match-teams"],
    queryFn: getMatchTeamList,
  });

  const seriesQuery = useQuery({
    queryKey: ["match-series"],
    queryFn: getMatchSeriesList,
  });

  const createMutation = useMutation({
    mutationFn: createMatch,
    onSuccess: () => {
      resetForm();
      toast.success("Match created");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error) =>
      toast.error(getApiMessage(error, "Unable to create match")),
  });

  const updateMutation = useMutation({
    mutationFn: updateMatch,
    onSuccess: () => {
      resetForm();
      toast.success("Match updated");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error) =>
      toast.error(getApiMessage(error, "Unable to update match")),
  });

  const deleteMutation = useMutation({
    mutationFn: deleteMatch,
    onSuccess: () => {
      toast.success("Match deleted");
      queryClient.invalidateQueries({ queryKey: ["matches"] });
    },
    onError: (error) =>
      toast.error(getApiMessage(error, "Unable to delete match")),
  });

  const teams = teamsQuery.data || [];
  const seriesList = seriesQuery.data || [];
  const matches = matchesQuery.data || [];
  const selectedTeam1 = watch("team1");

  const sortedMatches = useMemo(
    () =>
      [...matches].sort(
        (a, b) => new Date(a.startTime || 0) - new Date(b.startTime || 0),
      ),
    [matches],
  );

  const resetForm = () => {
    setEditingMatch(null);
    reset({
      seriesId: "",
      matchNumber: "",
      venue: "",
      startTime: "",
      status: "UPCOMING",
      team1: "",
      team2: "",
    });
  };

  const onSubmit = (data) => {
    const payload = {
      seriesId: data.seriesId,
      matchNumber: data.matchNumber.trim(),
      venue: data.venue.trim(),
      startTime: new Date(data.startTime).toISOString(),
      status: data.status,
      team1: data.team1,
      team2: data.team2,
    };

    if (editingMatch) {
      updateMutation.mutate({ id: editingMatch._id, payload });
    } else {
      createMutation.mutate(payload);
    }
  };

  const handleEdit = (match) => {
    setEditingMatch(match);
    reset({
      seriesId: getId(match.seriesId) || "",
      matchNumber: match.matchNumber || "",
      venue: match.venue || "",
      startTime: toDatetimeLocal(match.startTime),
      status: match.status || "UPCOMING",
      team1: getId(match.team1) || "",
      team2: getId(match.team2) || "",
    });
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleDelete = (id) => {
    if (window.confirm("Delete match?")) {
      deleteMutation.mutate(id);
    }
  };

  const isSaving = createMutation.isPending || updateMutation.isPending;
  const isReferenceLoading = teamsQuery.isLoading || seriesQuery.isLoading;

  return (
    <div className="h-full bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-3 mb-6">
          <div>
            <p className="text-[12px] font-semibold uppercase tracking-wider text-emerald-700">
              Admin
            </p>
            <h1 className="text-2xl font-semibold text-gray-900">
              Match Manager
            </h1>
            <p className="text-sm text-gray-500 mt-1">
              Schedule fixtures, update match details, and remove cancelled
              matches.
            </p>
          </div>
          {editingMatch && (
            <button
              type="button"
              onClick={resetForm}
              className="self-start sm:self-auto px-4 py-2 text-xs font-semibold rounded-lg border border-gray-200 bg-white text-gray-700 hover:bg-gray-100 transition-colors"
            >
              Cancel edit
            </button>
          )}
        </div>

        <div className="bg-white border border-gray-200 rounded-xl p-5 shadow-sm mb-8">
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Series
                </label>
                <select
                  {...register("seriesId", { required: "Series is required" })}
                  disabled={isReferenceLoading}
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  <option value="">Select series</option>
                  {seriesList.map((series) => (
                    <option key={series._id} value={series._id}>
                      {series.name} ({series.season})
                    </option>
                  ))}
                </select>
                {errors.seriesId && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.seriesId.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Match number
                </label>
                <input
                  {...register("matchNumber")}
                  type="text"
                  placeholder="e.g. Match 12"
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Status
                </label>
                <select
                  {...register("status")}
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  {STATUS_OPTIONS.map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Team 1
                </label>
                <select
                  {...register("team1", { required: "Team 1 is required" })}
                  disabled={isReferenceLoading}
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  <option value="">Select team</option>

                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.team1 && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.team1.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Team 2
                </label>
                <select
                  {...register("team2", {
                    required: "Team 2 is required",
                    validate: (value) =>
                      value !== selectedTeam1 ||
                      "Team 1 and Team 2 cannot be same",
                  })}
                  disabled={isReferenceLoading}
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                >
                  <option value="">Select team</option>
                  {teams.map((team) => (
                    <option key={team._id} value={team._id}>
                      {team.name}
                    </option>
                  ))}
                </select>
                {errors.team2 && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.team2.message}
                  </p>
                )}
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Start time
                </label>
                <input
                  {...register("startTime", {
                    required: "Start time is required",
                  })}
                  type="datetime-local"
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
                {errors.startTime && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.startTime.message}
                  </p>
                )}
              </div>

              <div className="md:col-span-2 lg:col-span-3">
                <label className="block text-xs font-semibold text-gray-500 mb-1">
                  Venue
                </label>
                <input
                  {...register("venue", { required: "Venue is required" })}
                  type="text"
                  placeholder="Stadium, City"
                  className="w-full p-2.5 text-sm bg-gray-50 border border-gray-200 rounded-lg focus:outline-none focus:border-gray-400"
                />
                {errors.venue && (
                  <p className="text-xs text-red-500 mt-1">
                    {errors.venue.message}
                  </p>
                )}
              </div>
            </div>

            <button
              type="submit"
              disabled={isSaving || isReferenceLoading}
              className="px-4 py-2 bg-gray-900 hover:bg-gray-800 disabled:bg-gray-400 text-white text-xs font-semibold rounded-lg transition-colors"
            >
              {isSaving
                ? "Saving..."
                : editingMatch
                  ? "Update match"
                  : "+ Add match"}
            </button>
          </form>
        </div>

        <div className="space-y-3">
          <h2 className="text-xs font-bold uppercase tracking-wider text-gray-400">
            Fixtures
          </h2>

          {matchesQuery.isLoading ? (
            <div className="text-center py-16 text-[13px] text-gray-400 bg-white border border-dashed border-gray-200 rounded-xl">
              Loading matches...
            </div>
          ) : matchesQuery.isError ? (
            <div className="text-center py-16 text-[13px] text-red-500 bg-red-50 border border-dashed border-red-100 rounded-xl">
              {getApiMessage(matchesQuery.error, "Unable to load matches")}
            </div>
          ) : sortedMatches.length === 0 ? (
            <div className="text-center py-16 text-[13px] text-gray-400 bg-white border border-dashed border-gray-200 rounded-xl">
              No matches found
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              {sortedMatches.map((match) => (
                <div
                  key={match._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-4"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <p className="text-xs font-semibold text-gray-400">
                        {getName(match.seriesId, "Series")} |{" "}
                        {match.matchNumber || "Match"}
                      </p>
                      <h3 className="text-base font-semibold text-gray-900 mt-1">
                        {getName(match.team1)} vs {getName(match.team2)}
                      </h3>
                    </div>
                    <span
                      className={`shrink-0 text-[10px] font-extrabold px-2 py-1 rounded-md ${
                        match.status === "LIVE"
                          ? "bg-green-50 text-green-700"
                          : match.status === "COMPLETED"
                            ? "bg-gray-100 text-gray-700"
                            : "bg-amber-50 text-amber-700"
                      }`}
                    >
                      {match.status}
                    </span>
                  </div>

                  <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                    <div>
                      <p className="text-[11px] text-gray-400">Start</p>
                      <p className="text-gray-700">
                        {formatMatchTime(match.startTime)}
                      </p>
                    </div>
                    <div>
                      <p className="text-[11px] text-gray-400">Venue</p>
                      <p className="text-gray-700">{match.venue}</p>
                    </div>
                  </div>

                  <div className="mt-4 pt-3 border-t border-gray-100 flex justify-end gap-3">
                    <button
                      type="button"
                      onClick={() => handleEdit(match)}
                      className="text-xs font-semibold text-gray-700 hover:text-gray-950 transition-colors"
                    >
                      Edit
                    </button>
                    <button
                      type="button"
                      onClick={() => handleDelete(match._id)}
                      disabled={deleteMutation.isPending}
                      className="text-xs font-semibold text-red-500 hover:text-red-700 disabled:text-red-300 transition-colors"
                    >
                      {deleteMutation.isPending ? "Removing..." : "Remove"}
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminMatchPage;
