﻿namespace API.Entities;

public class AppUsers
{
    public int Id { get; set; }
    public required string UserName { get; set; }

    public required string Email { get; set; }

    public string? Phone { get; set; }

}
