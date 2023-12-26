﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Interfaces
{
    public interface IUnitOfWork
    {
        IUserRepository UserRepository { get; }
        
        IMessageRepository MessageRepository { get; }

        ILikesRepository LikesRepository { get; }

        Task<bool> Complete();

        bool HasChanges();
    }
}
