using API.DTOs;
using API.Entities;
using API.Extensions;
using AutoMapper;

namespace API.Helpers;

public class AutoMapperProfiles: Profile 
{
    public AutoMapperProfiles()
    {
        CreateMap<AppUsers, MemberDto>()
            .ForMember(m => m.Age, o => o.MapFrom(s => s.DateOfBirth.CalculateAge()))
            .ForMember(m => m.PhotoUrl, o => o.MapFrom(s => s.Photos.FirstOrDefault(x => x.IsMain)!.Url));
        CreateMap<Photo, PhotoDto>();
        CreateMap<MemberUpdateDto, AppUsers>();
        CreateMap<RegisterDto, AppUsers>();    
        CreateMap<string, DateOnly>().ConvertUsing(d => DateOnly.Parse(d));    
    }
}
