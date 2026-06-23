from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Tournament, Team, Match, Standing

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'email']

class TournamentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tournament
        fields = ['id', 'name', 'sport_type', 'tournament_format', 'is_active', 'created_at']

class TeamSerializer(serializers.ModelSerializer):
    manager_details = UserSerializer(source='manager', read_only=True)

    class Meta:
        model = Team
        fields = ['id', 'name', 'manager', 'manager_details', 'manager_meta', 'is_banned', 'tournament']

class MatchSerializer(serializers.ModelSerializer):
    team1_name = serializers.CharField(source='team1.name', read_only=True)
    team2_name = serializers.CharField(source='team2.name', read_only=True)

    class Meta:
        model = Match
        fields = ['id', 'tournament', 'team1', 'team2', 'team1_name', 'team2_name', 'team1_score', 'team2_score', 'round_number', 'is_live', 'is_finalized']

class StandingSerializer(serializers.ModelSerializer):
    team_name = serializers.CharField(source='team.name', read_only=True)

    class Meta:
        model = Standing
        fields = ['id', 'tournament', 'team', 'team_name', 'played', 'won', 'drawn', 'lost', 'points']