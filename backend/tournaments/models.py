from django.db import models
from django.contrib.auth.models import User

class Tournament(models.Model):
    # Support for multiple formats and sports topologies
    FORMAT_CHOICES = [
        ('round_robin', 'Round Robin'),
        ('knockout', 'Knockout'),
        ('group_knockout', 'Group + Knockout'),
    ]
    
    SPORT_CHOICES = [
        ('football', 'Football'),
        ('cricket', 'Cricket'),
        ('basketball', 'Basketball'),
    ]

    name = models.CharField(max_length=255)
    sport_type = models.CharField(max_length=50, choices=SPORT_CHOICES, default='football')
    tournament_format = models.CharField(max_length=50, choices=FORMAT_CHOICES, default='round_robin')
    is_active = models.BooleanField(default=False) # Flashes active when fixtures generate
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name

class Team(models.Model):
    # Links team managers directly to database records via user relations
    name = models.CharField(max_length=255)
    manager = models.ForeignKey(User, on_delete=models.CASCADE, related_name='managed_teams')
    manager_meta = models.TextField(blank=True, null=True)
    is_banned = models.BooleanField(default=False) # Admin ban control switch
    tournament = models.ForeignKey(Tournament, on_delete=models.SET_NULL, null=True, blank=True, related_name='teams')

    def __str__(self):
        return self.name
class Match(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='matches')
    team1 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='home_matches')
    team2 = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='away_matches')
    
    # Track dynamic live scoring adjustments
    team1_score = models.IntegerField(default=0)
    team2_score = models.IntegerField(default=0)
    
    # Tournament structural progress attributes
    round_number = models.IntegerField(default=1)
    is_live = models.BooleanField(default=False)      # Toggled when match starts live tracking
    is_finalized = models.BooleanField(default=False) # Admin locks score; triggers points re-calculation
    
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"Round {self.round_number}: {self.team1.name} vs {self.team2.name}"


class Standing(models.Model):
    tournament = models.ForeignKey(Tournament, on_delete=models.CASCADE, related_name='standings')
    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name='stats')
    
    # Standings metrics matrix tracker
    played = models.IntegerField(default=0)
    won = models.IntegerField(default=0)
    drawn = models.IntegerField(default=0)
    lost = models.IntegerField(default=0)
    points = models.IntegerField(default=0) # Basis calculation target: (W * 3) + (D * 1)

    class Meta:
        ordering = ['-points', '-won', 'team__name'] # Automatically orders highest seeds to the top

    def __str__(self):
        return f"{self.team.name} - Pts: {self.points}"