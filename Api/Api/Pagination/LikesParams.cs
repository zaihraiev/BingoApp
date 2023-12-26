using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.Pagination
{
    public class LikesParams : PaginationParams
    {
        public int UserId { get; set; }

        public string Predicate { get; set; }
    }
}
