'use client'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faShoppingCart, faUser, faChevronLeft, faChevronRight } from '@fortawesome/free-solid-svg-icons';
export default function ItemPage(props) {
    const category = props.params.id;
      return (
        <div>
          <h1>the {category} Page</h1>
        </div>
      );
    }
    
  