export default function Pagination({page, setPage}) {
  const goTopage = (page) => {
    if(page > 0){
      setPage(page);
    }
  }
    return (
        <nav aria-label="Page navigation example">
  <ul className="pagination">
    <li className="page-item" onClick={() => goTopage(page = 1)}>
      <a className="page-link bg-medium-grey-1 white-1" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
        <li className="page-item" onClick={() => goTopage(page - 1)}>
      <a className="page-link bg-medium-grey-1 white-1" href="#" aria-label="Previous">
        <span aria-hidden="true">&lsaquo;</span>
      </a>
    </li>
    <li className="page-item "  ><a className="page-link bg-medium-grey-1 white-1 " href="#">{page}</a></li>
    <li className="page-item" onClick={() => goTopage(page + 1)}><a className="page-link  bg-medium-grey-1 white-1" href="#">{page + 1}</a></li>
    <li className="page-item" onClick={() => goTopage(page + 1)}>
      <a className="page-link bg-medium-grey-1 white-1" href="#" aria-label="Next">
        <span aria-hidden="true">&rsaquo;</span>
      </a>
    </li>
        <li className="page-item" onClick={() => goTopage(page = 500)}>
      <a className="page-link bg-medium-grey-1 white-1" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
  </ul>
</nav>
    );
}