myCanvas.width = 900;
myCanvas.height = 600;
const ctx = myCanvas.getContext("2d");
const margin = 30;

let array = [];
let reset = [];
let moves = [];
let cols = [];
let heights = [];
const maxColumnHeight = 200;
const fixedValues = [16, 32, 64, 128, 256];



//Gets value from fixedValues silder and sets the array size == to it, generating a new array of said size and changing
//text value on screen to reflect change
document.getElementById('myRange').addEventListener('input', function() 
{
    const value = fixedValues[document.getElementById('myRange').value];
    document.getElementById('sliderValue').innerText = value;
    init(value); 
});

function init(n)
{
    
    document.getElementById('sliderValue').innerText = n;
    array = [];
   
    for (let i = 0; i < n; ++i)
    {
        array[i] = Math.floor(Math.random() * (2000 - 400) + 400);
        reset[i] = array[i];
    }

    heights = [];
    moves = [];
    cols = [];
    array.length = n; 



    //creating n number of columns and initializing their position in the array
    for (let i = 0; i < array.length; ++i)
    {
        const x = i * ((myCanvas.width - 2 * margin) / n) + ((myCanvas.width - 2 * margin) / n) / 2 + margin;
        const y = myCanvas.height - margin;
        const width = ((myCanvas.width - 2 * margin) / n) - 4;
        const height =  array[i]/maxColumnHeight * 40;
        //creating the column with the properties specified above 
        cols[i] = new Column(x,y,width,height);
    }
}

function resetArr(){
  
    moves = [];
    heights = [];
    for (let i = 0; i < array.length; ++i){
        
        array[i] = reset[i];
    } 
    
    for (let i = 0; i < array.length; ++i){
        const x = i * ((myCanvas.width - 2 * margin) / array.length) + ((myCanvas.width - 2 * margin) / array.length) / 2 + margin;
        const y = myCanvas.height - margin;
        const width = ((myCanvas.width - 2 * margin) / array.length) - 4;
        const height =  array[i]/maxColumnHeight * 40;
        //creating the column with the properties specified above 
        cols[i] = new Column(x,y,width,height);
    
    }
}
function play(n)
{
    
    switch(n)
    {
        case 1: moves = bubbleSort(array);
            break;
        case 2: moves = quickSort(array);
            break;
        case 3: moves = insertionSort(array);
            break;
        case 4: moves = selectionSort(array);
            break;
        case 5: moves = mergeSortIt(array);
            break;
    }
    
}


animate();

/*----------------------------------BUBBLE SORT---------------------------*/
function bubbleSort(array){
    const heights = [];
    const moves = [];
    
    do 
    {
        var swapped = false;
        for (let i = 1; i < array.length; ++i)
        {
            if (array[i - 1] > array[i])
            {
                swapped = true;
                [array[i - 1], array[i]] = [array[i], array[i -1]];
                moves.push(
                    {indices:[i - 1, i], swap:true}
                );
            }
        }
    } while(swapped);

    return moves;
}
/*---------------------------------------------------------------------- */


/*-------------------------Selection Sort--------------------------------*/
function selectionSort(array) {
    const heights = [];
    const moves = [];
    
    for (let start = 0; start < array.length - 1; ++start) 
    {
        let minIndex = start;
        for (let i = start + 1; i < array.length; ++i) 
            if (array[i] < array[minIndex]) 
                minIndex = i;
            
        
        
        if (minIndex !== start) 
        {
            [array[start], array[minIndex]] = [array[minIndex], array[start]];
            moves.push({ indices: [start, minIndex], swap: true });
        } 
        else 
        {
            moves.push({ indices: [start, minIndex], swap: false });
        }
    }
    
    return moves;
}

/*---------------------------------------------------------------------- */
/*-------------------------Insertion Sort--------------------------------*/

function insertionSort(array)
{
    const heights = [];
    const moves = [];

    for (let start = 0; start < array.length - 1; ++start)
    {
        for (let i = start; i >= 0; --i)
        {
            if (array[i + 1] < array[i])
            {
                [array[i + 1], array[i]] = [array[i], array[i + 1]];
                moves.push({indices: [i, i + 1], swap:true});
            }
            else 
            {
                moves.push({indices:[i, i + 1], swap:false});
            }
        }
    }
    return moves;
}



/*---------------------------------------------------------------------- */
/*-------------------------Quick Sort--------------------------------*/
function partition(arr, low, high)
{
    let temp;
    let pivot = arr[high];
  
    let i = (low - 1);
    for (let j = low; j <= high - 1; j++) 
    {
        if (arr[j] <= pivot) 
        {
            i++;
            temp = arr[i];
            arr[i] = arr[j];
            arr[j] = temp;
            moves.push({indices:[i, j], swap:true});
        }
    }
  
    temp = arr[i + 1];
    arr[i + 1] = arr[high];
    arr[high] = temp;
    moves.push({indices:[i +1, high], swap:true})
    return i + 1;
}

function qSort(arr, low, high)
{
    if (low < high) 
    {
        /* pi is partitioning index, 
        arr[pi] is now at right place */
        let pi = partition(arr, low, high);
  
        qSort(arr, low, pi - 1);
        qSort(arr, pi + 1, high);
    }

    return moves; 
}


function quickSort(array)
{
    const heights = [];
    moves = qSort(array, 0, array.length - 1);
    return moves;
}
/*---------------------------------------------------------------------- */

/*-------------------------Merge Sort ITERATIVE--------------------------------*/
function mergeSortIt(arr) 
{
    const heights = [];
    var n = arr.length;
    var curr_size;
    var left_start;
    const moves = [];
    //create subarrays of that double each time, starting from 1 up to the size of the
    // original array
    for (curr_size = 1; curr_size <= n - 1; curr_size = 2 * curr_size) 
    {
        for (left_start = 0; left_start < n - 1; left_start += 2 * curr_size) 
        {
            var mid = Math.min(left_start + curr_size - 1, n - 1);
            var right_end = Math.min(left_start + 2 * curr_size - 1, n - 1);
            merge(arr, left_start, mid, right_end);
        }
    }
    
    return moves; 
}


function merge(arr , l , m , r) 
{
    var i, j, k;
    var n1 = m - l + 1;
    var n2 = r - m;
    /* create temp arrays */
    var L = Array(n1).fill(0);
    var R = Array(n2).fill(0);

    for (i = 0; i < n1; i++)
        L[i] = arr[l + i];

    for (j = 0; j < n2; j++)
        R[j] = arr[m + 1 + j];

    i = 0;
    j = 0;
    k = l;

    while (i < n1 && j < n2) 
    {
        if (L[i] <= R[j]) 
        {
            arr[k] = L[i];
            heights.push({index:k, newHeight: L[i]/maxColumnHeight *40});
            i++;
        } 
        else 
        {
            arr[k] = R[j];
            heights.push({index:k, newHeight: R[j]/maxColumnHeight * 40});
            j++;
        }
        k++;
    }

    while (i < n1) 
    {
        arr[k] = L[i];
        heights.push({index:k, newHeight: L[i]/maxColumnHeight *40});
        i++;
        k++;
    }


    while (j < n2) 
    {
        arr[k] = R[j];
        heights.push({index:k, newHeight: R[j]/maxColumnHeight * 40});
        j++;
        k++;
    }
}
/*---------------------------------------------------------------------- */

function animate() 
{

    //create a transparent rectangular area to populate
    ctx.clearRect(0, 0, myCanvas.width, myCanvas.height);
    let changed = false;
    for (let i = 0; i < cols.length; ++i)
    {
        //if any changed frame is encountered, changed will be set to true
        changed = cols[i].draw(ctx, "gray")||changed;
    }
    
    if (!changed && moves.length > 0)
    {
        const move = moves.shift();
        const [i, j] = move.indices;
        //if move.swap is true, animate the swap
        if (move.swap)
        {
            cols[i].moveTo(cols[j]);
            cols[j].moveTo(cols[i], -1);
            [cols[i], cols[j]] = [cols[j], cols[i]];
        }  
    }

    if (!changed && heights.length > 0)
    {
        const h = heights.shift();
        const idx = h.index; 
        const nHeight = h.newHeight;
        cols[idx].height = nHeight;
        cols[idx].jump(2);
    }
    
    requestAnimationFrame(animate);
}