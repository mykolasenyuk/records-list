import ReactPaginate from 'react-paginate';
import { BiRightArrow,BiLeftArrow} from 'react-icons/bi'

import './index.css';
export default  function Paginate({handlePageClick, pageCount}){
    return (
        <div >
        <ReactPaginate
            // className={"flex  justify-center p-2 w-full h-full"}
            activeClassName={"active"}
            onPageChange={handlePageClick}
            pageCount={pageCount}
            breakClassName={'item break-me '}
            breakLabel={'...'}
            containerClassName={'pagination'}
            disabledClassName={'disabled-page'}
            marginPagesDisplayed={2}
            nextClassName={"item next "}
            nextLabel={<BiRightArrow style={{ fontSize: 18, width: 15 }} />}
            pageClassName={'item pagination-page '}
            pageRangeDisplayed={1}
            previousClassName={"item previous"}
            previousLabel={<BiLeftArrow style={{ fontSize: 18, width: 15 }} />}

        />

    </div>)

}