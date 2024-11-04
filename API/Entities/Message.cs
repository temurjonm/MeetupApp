using System;

namespace API.Entities;

public class Message
{
    public int Id { get; set; }
    public required string SenderUsername { get; set; }
    public required string RecipientUsername { get; set; }
    public required string Content { get; set; }
    public DateTime? DateRead { get; set; }
    public DateTime MessageSent { get; set; } = DateTime.UtcNow;
    public bool SenderDeleted { get; set; }
    public bool RecipientDeleted { get; set; }

    // navigation properties
    public int SenderId { get; set; }
    public AppUsers Sender { get; set; } = null!;
    public int RecipientId { get; set; }
    public AppUsers Recipient { get; set; } = null!;
}
