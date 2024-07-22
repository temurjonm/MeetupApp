using API.Entities;

namespace API;

public interface ITokenService
{
    string CreateToken(AppUsers user);
}
