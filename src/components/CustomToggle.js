import React from 'react';
import './CustomToggle.css'
import { useAccordionToggle } from 'react-bootstrap/AccordionToggle';

// class CustomToggle extends Component {
    
//     render() {
//         const decoratedOnClick = useAccordionToggle(this.props.eventKey, () => console.log('toggled'), );
//         return (
//             <div
//             onClick={decoratedOnClick}>
//                 <div {...{ className: 'accordion-item__line' }}>
//                     {this.props.children}
//                 <span {...{ className: 'accordion-item__icon' }}/>
//                 </div>
//             </div>
//             );
//     }
// }

function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionToggle(eventKey, () =>
      console.log('totally custom! '),
    );
  
    return (
        <div
        onClick={decoratedOnClick}>
            <div {...{ className: 'accordion-item__line' }}>
                {children}
            <span {...{ className: 'accordion-item__icon' }}/>
            </div>
        </div>
    );
  }
  

export default CustomToggle;