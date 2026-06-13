import { createBrowserRouter, RouterProvider } from "react-router";
import { lazy, Suspense } from "react";

// Layouts — ye eager load honge (chhote hain)
import AuthLayout from "../layouts/AuthLayout";
import PublicLayout from "../layouts/PublicLayout";
import AdminLayout from "../layouts/AdminLayout";
import SuperAdminLayout from "../layouts/SuperAdminLayout";
import ScorerLayout from "../layouts/ScorerLayout";

// ─── Lazy imports ───
// Auth Pages
const LoginPage = lazy(() => import("@/features/auth/ui/LoginPage"));
const RegisterPage = lazy(() => import("@/features/auth/ui/RegisterPage"));

// Public Pages
const HomePage = lazy(() => import("@/features/home/ui/HomePage"));
const SearchPage = lazy(() => import("@/features/search/ui/SearchPage"));
const SeriesListPage = lazy(() => import("@/features/series/ui/SeriesListPage"));
const SeriesDetailPage = lazy(() => import("@/features/series/ui/SeriesDetailPage"));
const SeriesMatchesPage = lazy(() => import("@/features/series/ui/SeriesMatchesPage"));
const PointsTablePage = lazy(() => import("@/features/series/ui/PointsTablePage"));
const MatchCenterPage = lazy(() => import("@/features/match/ui/MatchCenterPage"));
const ScoreCardPage = lazy(() => import("@/features/match/ui/ScoreCardPage"));
const CommentaryFeedPage = lazy(() => import("@/features/commentary/ui/CommentaryFeedPage"));

// Admin Pages
const AdminDashboardPage = lazy(() => import("@/features/dashboard/ui/AdminDashboardPage"));
const AdminSeriesPage = lazy(() => import("@/features/series/ui/admin/AdminSeriesPage"));
const SeriesFormPage = lazy(() => import("@/features/series/ui/admin/SeriesFormPage"));
const AdminTeamPage = lazy(() => import("@/features/team/ui/admin/AdminTeamPage"));
const TeamFormPage = lazy(() => import("@/features/team/ui/admin/TeamFormPage"));
const SquadPage = lazy(() => import("@/features/team/ui/admin/SquadPage"));
const AdminPlayerPage = lazy(() => import("@/features/player/ui/admin/AdminPlayerPage"));
const PlayerFormPage = lazy(() => import("@/features/player/ui/admin/PlayerFormPage"));
const AdminMatchPage = lazy(() => import("@/features/match/ui/admin/AdminMatchPage"));
const MatchFormPage = lazy(() => import("@/features/match/ui/admin/MatchFormPage"));

// Super Admin Pages
const SuperAdminDashboard = lazy(() => import("@/features/dashboard/ui/SuperAdminDashboard"));
const AdminUserPage = lazy(() => import("@/features/users/ui/admin/AdminUserPage"));
const SuperAdminSeriesPage = lazy(() => import("@/features/series/ui/superadmin/SuperAdminSeriesPage"));
const SuperAdminTeamPage = lazy(() => import("@/features/team/ui/superadmin/SuperAdminTeamPage"));
const SuperAdminPlayerPage = lazy(() => import("@/features/player/ui/superadmin/SuperAdminPlayerPage"));
const SuperAdminMatchPage = lazy(() => import("@/features/match/ui/superadmin/SuperAdminMatchPage"));

// Scorer Pages
const ScorerDashboardPage = lazy(() => import("@/features/dashboard/ui/ScorerDashboardPage"));
const ScorerMatchesPage = lazy(() => import("@/features/match/ui/scorer/ScorerMatchesPage"));
const TossPage = lazy(() => import("@/features/match/ui/scorer/TossPage"));
const PlayingXIPage = lazy(() => import("@/features/match/ui/scorer/PlayingXIPage"));
const ScoringPage = lazy(() => import("@/features/match/ui/scorer/ScoringPage"));
const CompleteMatchPage = lazy(() => import("@/features/match/ui/scorer/CompleteMatchPage"));
const CommentaryEntryPage = lazy(() => import("@/features/commentary/ui/scorer/CommentaryEntryPage"));

const AppRoutes = () => {

    let router = createBrowserRouter([


        // Auth Routes
        {
            path: '/auth',
            element: <AuthLayout />,
            children: [
                {
                    index: true,
                    element: <LoginPage />
                },
                {
                    path: 'register',
                    element: <RegisterPage />
                },
            ]
        },



        // Public Routes
        {
            path: '/',
            element: <PublicLayout />,
            children: [
                {
                    index: true,
                    element: <HomePage />
                },
                {
                    path: 'search',
                    element: <SearchPage />
                },
                {
                    path: 'series',
                    element: <SeriesListPage />
                },
                {
                    path: 'series/:id',
                    element: <SeriesDetailPage />
                },
                {
                    path: 'series/:id/matches',
                    element: <SeriesMatchesPage />
                },
                {
                    path: 'series/:id/points-table',
                    element: <PointsTablePage />
                },
                {
                    path: 'matches/:id/center',
                    element: <MatchCenterPage />
                },
                {
                    path: 'matches/:id/scorecard',
                    element: <ScoreCardPage />
                },
                {
                    path: '/matches/:id/commentary',
                    element: <CommentaryFeedPage />
                }
            ]
        },



        // Admin Routes
        {
            path: '/admin',
            element: <AdminLayout />,
            children: [
                {
                    index: true,
                    element: <AdminDashboardPage />
                },
                {
                    path: 'series',
                    element: <AdminSeriesPage />
                },
                {
                    path: 'series/new',
                    element: <SeriesFormPage />
                },
                {
                    path: 'series/:id/edit',
                    element: <SeriesFormPage />
                },
                {
                    path: 'teams',
                    element: <AdminTeamPage /> 
                },
                {
                    path: 'teams/new',
                    element: <TeamFormPage />
                }, 
                {
                    path: 'teams/:id/edit',
                    element: <TeamFormPage />
                },
                {
                    path: 'teams/:id/squad',
                    element: <SquadPage />
                },
                {
                    path: 'players',
                    element: <AdminPlayerPage />
                }, 
                {
                    path: 'players/new',
                    element: <PlayerFormPage /> 
                }, 
                {
                    path: 'player/:id/edit',
                    element: <PlayerFormPage />
                },
                {
                    path: 'matches', 
                    element: <AdminMatchPage />
                }, 
                {
                    path: 'matches/new',
                    element: <MatchFormPage />
                },
                {
                    path: 'matches/:id/edit',
                    element: <MatchFormPage />
                },
            ]
        },



        // Super Admin Routes
        {
            path: '/super-admin',
            element: <SuperAdminLayout />,
            children: [
                {
                    index: true,
                    element: <SuperAdminDashboard />
                },
                {
                    path: 'users',
                    element: <AdminUserPage />
                },
                {
                    path: 'series',
                    element: <SuperAdminSeriesPage />
                },
                {
                    path: 'series/new',
                    element: <SeriesFormPage />
                },
                {
                    path: 'series/:id/edit',
                    element: <SeriesFormPage />
                },
                {
                    path: 'teams',
                    element: <SuperAdminTeamPage /> 
                },
                {
                    path: 'teams/new',
                    element: <TeamFormPage />
                }, 
                {
                    path: 'teams/:id/edit',
                    element: <TeamFormPage />
                },
                {
                    path: 'teams/:id/squad',
                    element: <SquadPage />
                },
                {
                    path: 'players',
                    element: <SuperAdminPlayerPage />
                }, 
                {
                    path: 'players/new',
                    element: <PlayerFormPage /> 
                }, 
                {
                    path: 'player/:id/edit',
                    element: <PlayerFormPage />
                },
                {
                    path: 'matches', 
                    element: <SuperAdminMatchPage />
                }, 
                {
                    path: 'matches/new',
                    element: <MatchFormPage />
                },
                {
                    path: 'matches/:id/edit',
                    element: <MatchFormPage />
                },
            ]
        },



        // Scorer Routes
        {
            path: '/scorer',
            element: <ScorerLayout />,
            children: [
                {
                    index: true,
                    element: <ScorerDashboardPage />
                },
                {
                    path: 'matches',
                    element: <ScorerMatchesPage />
                }, 
                {
                    path: 'matches/:id/toss',
                    element: <TossPage />
                }, 
                {
                    path: 'matches/:id/playing-xi',
                    element: <PlayingXIPage />
                },
                {
                    path: 'matches/:id/scoring',
                    element: <ScoringPage />
                }, 
                {
                    path: 'matches/:id/commentary',
                    element: <CommentaryEntryPage />
                },
                {
                    path: 'matches/:id/complete',
                    element: <CompleteMatchPage />
                }
            ]
        }
    ])
    
    return (
        <Suspense fallback={<h1>Loading...</h1>}>
             <RouterProvider router={router} />
        </Suspense>
    )
}

export default AppRoutes