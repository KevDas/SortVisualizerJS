function selectionSort(array){
    const moves = [];
    
    var start = 0;
    var min = array[0];
    do {
        var swapped = false;
       

        for (let i = start; i < array.length; ++i)
        {
            if (array[i] < min) 
            {
                min = array[i];
                swapped = true;
            }
            console.log(min);

        }
        if (swapped)
        {
            [array[start], array[min]] = [array[min], array[start]];
            moves.push(
                {indices:[start, min], swap:true}
            );
            start++;
        }
        else 
        {
            moves.push(
                {indices:[start, min], swap:false}
            );
        }
    } while(swapped);

    return moves; 
    
}