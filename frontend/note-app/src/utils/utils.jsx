import moment from 'moment';

export const placeholderInitialName = (name)=>{
    let initial ='';

    if(name)
    {
        const words = name.split(" ");
    
        for(let i=0; i < Math.min(words.length,2); i++){
            initial += words[i][0];
        }
    }
    
    return initial
}

export const dateFormatter = ({ timestamp }) => {
    // Format the timestamp
    const formattedDate = moment(timestamp).format('YYYY-MM-DD h:mm:ss');
  
    return formattedDate;
};

export const getRange = (ini, end) => 
    Array.from({length:end},(v, i)=> i+1).filter( x => x >= ini && x <= end);