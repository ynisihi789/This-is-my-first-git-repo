from rest_framework import viewsets, permissions, status
from rest_framework.decorators import action
from rest_framework.response import Response
from .models import Tournament, Team, Match, Standing
from .serializers import TournamentSerializer, TeamSerializer, MatchSerializer, StandingSerializer

class TournamentViewSet(viewsets.ModelViewSet):
    queryset = Tournament.objects.all()
    serializer_class = TournamentSerializer
    permission_classes = [permissions.AllowAny]

    @action(detail=True, methods=['post'])
    def generate_fixtures(self, request, pk=None):
        tournament = self.get_object()
        
        # Fetch all active, non-banned teams registered for this tournament
        teams = list(tournament.teams.filter(is_banned=False))
        
        if len(teams) < 2:
            return Response(
                {"error": "At least 2 active teams are required to generate fixtures."},
                status=status.HTTP_400_BAD_REQUEST
            )
            
        # Prevent regeneration if fixtures already exist to ensure database consistency
        if tournament.matches.exists():
            return Response(
                {"error": "Fixtures have already been generated for this tournament."},
                status=status.HTTP_400_BAD_REQUEST
            )

        # Round Robin Bracket Logic Algorithm (Circle Method / Polygon Method)
        if len(teams) % 2 != 0:
            teams.append(None) # None represents a "Bye" week

        num_teams = len(teams)
        rounds = num_teams - 1
        matches_per_round = num_teams // 2

        # Generate pairings for each round
        for r in range(rounds):
            round_num = r + 1
            for m in range(matches_per_round):
                home = teams[m]
                away = teams[num_teams - 1 - m]
                
                if home is not None and away is not None:
                    Match.objects.create(
                        tournament=tournament,
                        team1=home,
                        team2=away,
                        round_number=round_num
                    )
            
            # Rotate teams array (Circle Method)
            teams = [teams[0]] + [teams[-1]] + teams[1:-1]

        # Automatically initialize the Standings Table rows for all competing teams
        for team in tournament.teams.filter(is_banned=False):
            Standing.objects.get_or_create(tournament=tournament, team=team)

        # Activate the tournament status flag
        tournament.is_active = True
        tournament.save()

        return Response(
            {"message": f"Successfully generated Round Robin fixtures for {tournament.name}!"},
            status=status.HTTP_201_CREATED
        )


# --- CRITICAL: MAKE SURE THESE THREE CLASSES ARE FULLY WRITTEN AT THE BOTTOM ---

class TeamViewSet(viewsets.ModelViewSet):
    queryset = Team.objects.all()
    serializer_class = TeamSerializer
    permission_classes = [permissions.AllowAny]


class MatchViewSet(viewsets.ModelViewSet):
    queryset = Match.objects.all()
    serializer_class = MatchSerializer
    permission_classes = [permissions.AllowAny]


class StandingViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Standing.objects.all()
    serializer_class = StandingSerializer
    permission_classes = [permissions.AllowAny]