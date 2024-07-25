using System.ComponentModel;
using System.ComponentModel.DataAnnotations;

namespace API.DTOs;

public class RegisterDto
{
    [MaxLength(100)]
    public required string Username { get; set; }

    [StringLength(6, MinimumLength = 4)]
    public required string Password { get; set; }

    [EmailAddress]
    public string? Email { get; set; }

    [Phone]
    public string? Phone { get; set; }
}
