#### Questions 
*Answer in the file `Problem2/answers2.md`. Answer these questions even if you use Python for scraping.*

1. Look at the data given in the Wiki table. Describe the data types. What is different from the datasets you've used before? 

The data includes Year,UnitedStatesCensusBureau,PopulationReferenceBureau,UnitedNations,HYDE,Maddison. The year should be pased as Date Object with 1990 etc comverted to time scale.

The data type for all columns can be treated as INT. Differences are we are scraping the data, there are nulls in the data. There is negatives in the data.

2. Take a look at the DOM tree for the Wikipedia table. Formulate in [jQuery selector syntax](http://www.w3schools.com/jquery/trysel.asp) the selection that would give you the DOM element for the second row in the Wikipedia table. Write down in selection syntax how you would get all table rows that are not the header row. 

$.each(tr, function(i, el) {
                var year = $(this).find("td:first").text(); 
                year = year.replace(/^\s+|\s+$/g, '');
                var UnitedStatesCensusBureau = $(this).find("td").eq(2).text(); 
                var PopulationReferenceBureau = $(this).find("td").eq(3).text(); 
                var UnitedNations = $(this).find("td").eq(4).text(); 
                var HYDE = $(this).find("td").eq(5).text();  
                var Maddison = $(this).find("td").eq(6).text(); 
    }
}
