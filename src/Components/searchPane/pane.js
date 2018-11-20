import React from 'react';
import Category from './Panes/category';
import Brand from './Panes/brand';
import Price from './Panes/price';

export const Pane = (props) =>{

    return(
        <div style={{textAlign:'center',border:'1px solid rgba(0,0,0,0.75)',borderRadius:'5px',padding:'2.5% 5%'}}>
            <Category category={props.category}></Category>
            <Brand category={props.category}></Brand>
            <Price category={props.category}></Price>
        </div>
    )
}