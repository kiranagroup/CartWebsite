export const Reducer = (state={},action) =>{

    if(action.type=='add'){
        var flag=0;
        if(state.added){
            for(var i=0;i<state.added.length;i++){
                if(state.added[i].Product['Product_ID']==action.payLoad.Product.Product_ID){
                    state.added[i].value+=1;
                    state.count=parseInt(state.count)+1;
                    flag=1;
                    break;
                }
            }
        }
        if(!state.added || state.added.length<1){
            state= {...state,'added':[{'Product':action.payLoad.Product,'value':1}],'count':parseInt(state.count)+1 || 1};
            localStorage.setItem('added',JSON.stringify(state.added));
            localStorage.setItem('count',state.count);
            return {...state};
        }
        if(!flag){
            state.added.push({'Product':action.payLoad.Product,'value':1});
            state={...state,'count':parseInt(state.count)+1};
        }
        localStorage.setItem('added',JSON.stringify(state.added));
        localStorage.setItem('count',state.count);
        return {...state};
    }

    else if(action.type=='sub'){
        for(var i=0;i<state.added.length;i++){
            if(state.added[i].Product['Product_ID']==action.payLoad.Product.Product_ID){
                if(state.added[i].value==1){
                    state.added.splice(i,1);
                    break;
                }
                state.added[i].value-=1;
                break;
            }
        }
        state={...state,'count':parseInt(state.count)-1};
        localStorage.setItem('added', JSON.stringify(state.added));
        localStorage.setItem('count',state.count);
        return {...state};
    }

    else if(action.type=='retain'){
        if(action.payLoad){
            state= {...state,'added':action.payLoad.added,'count':action.payLoad.count};
        }
        return {...state};
    }

    else if(action.type=='count'){
        return{...state};
    }
    
    else if(action.type=='removeAll'){
        localStorage.setItem('added',[]);
        localStorage.setItem('count',0);
        if(!state.added){
            return {...state};
        }
        if(state.added){
            state.added=null;
        }
        else if(state.added.length>0){
            state.added=null;
        }
        if(state.count){
            state.count=0;
        }
        return {...state};
    }

    else if(action.type=='remove'){
        var obj = {}
        console.log("in remove",state.added);
        for(let i=0;i<state.added.length;i++){
            if(state.added[i].Product['Product_ID']==action.payLoad.Product.Product.Product_ID){
                obj=state.added[i];
                state.added.splice(i,1);
                state.count=state.count-action.payLoad.Product.value;
                break;
            }
        }
        if(state.added.length>0){
        localStorage.setItem('added', JSON.stringify(state.added));
        }
        else{
            localStorage.setItem('added', []);
        }
        localStorage.setItem('count', state.count);
        console.log("in remove last",state.added);
        return {...state,'added':state.added,'count':state.count,'current':obj};
    }

    return state;

}