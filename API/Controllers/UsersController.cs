using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers;

[ApiController]
[Route("/api/[controller]")]
public class UsersController(DataContext context): BaseApiController
{
    [HttpGet]
    public async Task<ActionResult<IEnumerable<AppUsers>>> GetUser() {
        var users = await context.Users.ToListAsync();
        return users;
    }

    [Authorize]
    [HttpGet("{id:int}")]
    public async Task<ActionResult<AppUsers>> GetUser(int id) {
        var user = await context.Users.FindAsync(id);
        if (user == null) return NotFound();
        return user;
    }
}
