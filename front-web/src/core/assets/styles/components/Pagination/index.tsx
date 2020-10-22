import React from 'react';
import { ReactComponent as ArrowIcon } from '../../../../assets/images/arrow.svg';
import { generateList } from '../../../../utilis/list';
import './styles.scss';

type Props = {
    totalPages: number;
    activePage: number;
    onChange: (item:number) => void;
}

const Pagination = ( { totalPages,activePage,onChange}: Props) => {

    const items = generateList(totalPages);
    // [0,1,2,3,4]

    return (
        <div className="pagination-container">
            <ArrowIcon className="pagination-previous" />
            {items.map(item => (
                <div
                    key={item  }
                    className={`pagination-item ${item === activePage ? 'active' : ''}`}
                    onClick={() => onChange(item)} 
                   
                >
                    {item + 1}
                </div>

            ))}


            <ArrowIcon className="pagination-next" />
        </div>
    );


}

export default Pagination;