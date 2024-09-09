using System;
using API.DTOs;
using API.Entities;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data;

public class LikeRepository(DataContext context, IMapper mapper) : ILikeRepository
{
    public void AddLike(UserLike like)
    {
        context.Likes.Add(like);
    }

    public void DeleteLike(UserLike like)
    {
        context.Likes.Remove(like);
    }


    public async Task<UserLike> GetUserLike(int sourceUserId, int targetUserId)
    {
       return await context.Likes.FindAsync(sourceUserId, targetUserId);
    }

    public async Task<PagedList<MemberDto>> GetUserLikes(LikesParams likesParams)
    {
        var likes = context.Likes.AsQueryable();
        IQueryable<MemberDto> query;

        switch (likesParams.Predicate) 
        {
            case "liked":
                query = likes
                    .Where(like => like.SourceUserId == likesParams.UserId)
                    .Select(like => like.TargetUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
                break;
            case "likedBy":
                query = likes
                    .Where(like => like.TargetUserId == likesParams.UserId)
                    .Select(like => like.SourceUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
                break;
            default:
                var likedIds = await GetUserWithLikeIds(likesParams.UserId);

                query = likes
                    .Where(like => like.TargetUserId == likesParams.UserId && likedIds.Contains(like.SourceUserId))
                    .Select(like => like.SourceUser)
                    .ProjectTo<MemberDto>(mapper.ConfigurationProvider);
                break;
        }

        return await PagedList<MemberDto>.CreateAsync(query, likesParams.PageNumber, likesParams.PageSize);
    }

    public async Task<IEnumerable<int>> GetUserWithLikeIds(int currentUserId)
    {
        return await context.Likes
            .Where(x => x.SourceUserId == currentUserId)
            .Select(x => x.TargetUserId)
            .ToListAsync();
    }

    public async Task<bool> SaveAllAsync()
    {
        return await context.SaveChangesAsync() > 0;
    }
}
