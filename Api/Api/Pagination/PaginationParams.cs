﻿using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Pagination
{
    public class PaginationParams
    {
        private const int maxPageSize = 50;

        private int pageSize = 10;

        public int PageNumber { get; set; } = 1;

        public int PageSize
        {
            get => this.pageSize;
            set => this.pageSize = (value > maxPageSize) ? maxPageSize : value;
        }
    }
}
