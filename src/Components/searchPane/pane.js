import React from 'react';
import Category from './Panes/category';
import Brand from './Panes/brand';

export const Pane = (props) =>{

    return(
        <div style={{textAlign:'center',border:'1px solid rgba(0,0,0,0.75)',borderRadius:'5px',padding:'2.5% 5%'}}>
            <Category category={props.category}></Category>
            <Brand category={props.category}></Brand>
        </div>
    )
}