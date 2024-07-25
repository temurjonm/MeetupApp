using API.Controllers;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllersy;

public class BuggyController(DataContext context): BaseApiController
{
    [HttpGet("auth")]
    public ActionResult<AppUsers> GetAuth() {
        var user = context.Users.Find(-1);
        if (user == null) return NotFound();
        return user;
    }

    [HttpGet("not-found")]
    public ActionResult<AppUsers> GetNotFound() {
        var user = context.Users.Find(-1);
        if (user == null) return NotFound();
        return user;
    }

    [HttpGet("server-error")]
    public ActionResult<AppUsers> GetServiceError() {
        try
        {
            var thing = context.Users.Find(-1) ?? throw new Exception("Internal server Error!!!");
            return thing;
        }
        catch (Exception)
        {
           return StatusCode(500, "Another server error");
        }
    }

    [HttpGet("bad-request")]
    public ActionResult<string> GetBadRequest() {
        return BadRequest("Bad request, please check!");
    }
}
