﻿using System.Security.Claims;

namespace API.Extensions;

public static class ClaimsPrincipleExtensions
{
    public static string Getusername(this ClaimsPrincipal user) {
        var username = user.FindFirstValue(ClaimTypes.NameIdentifier) ?? throw new Exception("No username found in token");
        return username;
    }
}