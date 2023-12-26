﻿using DatingApp.Extensions;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.SignalR;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.SignalR
{
    [Authorize]
    public class PresenceHub : Hub
    {
        private readonly PresenceTracker tracker;

        public PresenceHub(PresenceTracker tracker)
        {
            this.tracker = tracker;
        }

        public override async Task OnConnectedAsync()
        {
            var isOnline = await this.tracker.UserConnected(Context.User.GetUsername(), Context.ConnectionId);

            if (isOnline)
                await Clients.Others.SendAsync("UserIsOnline", Context.User.GetUsername());

            var currentUsers = await this.tracker.GetOnlineUsers();
            await Clients.Caller.SendAsync("GetOnlineUsers", currentUsers);
        }

        public override async Task OnDisconnectedAsync(Exception exception) 
        {     
            var isOffline = await this.tracker.UserDisconnected(Context.User.GetUsername(), Context.ConnectionId);

            if (isOffline)
                await Clients.Others.SendAsync("UserIsOffline", Context.User.GetUsername());

            await base.OnDisconnectedAsync(exception);
        }
    } 
}
