﻿using API.Extensions;

namespace API.Entities;

public class AppUsers
{
    public int Id { get; set; }
    public required string UserName { get; set; }
    public DateOnly DateOfBirth { get; set; }
    public required string KnownAs { get; set; }
    public Byte[] PasswordHash { get; set; } = [];
    public Byte[] PasswordSalt { get; set; } = [];
    public DateTime Created { get; set; } = DateTime.UtcNow;
    public DateTime LastActive { get; set; } = DateTime.UtcNow;
    public required string Gender { get; set; }
    public string? Inctoduction { get; set; }
    public string? LookingFor { get; set; }
    public required string City { get; set; }
    public required string Country { get; set; }
    public List<Photo> Photos { get; set; } = [];
    public int GetAge() {
        return DateOfBirth.CalculateAge();
    }

}
