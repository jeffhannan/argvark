    // 
    // Constructor
    // 
function UtilsPage()
{
}
        
                  
    // 
    // Init
    //


UtilsPage.prototype.Init = function()
{
}


    // 
    // Display
    //



UtilsPage.prototype.DisplayArgPageNumber = function(jqidSection, jqidPage, jqidPrev, jqidNext, pageIndex, lastPage)
{
    var page0 = (pageIndex == 0);
    var disablePageNumber = (page0 && lastPage);
    
    // Disable if only one page
    if (disablePageNumber)
    {
        $(jqidSection).hide();
    }
    else
    {
        $(jqidSection).show();
        
        // Add 1. i.e. show page index 0 as 1
        $(jqidPage).html(pageIndex + 1);
        // Set disabled status for Prev
        if (pageIndex == 0)
        {
            $(jqidPrev).attr("disabled", true);
        }
        else
        {
            $(jqidPrev).attr("disabled", false);
        }
        
        // Set disabled status for Next
        if (lastPage)
        {
            $(jqidNext).attr("disabled", true);
        }
        else
        {
            $(jqidNext).attr("disabled", false);
        }
    }   
}


    // 
    // Event Handlers
    //


