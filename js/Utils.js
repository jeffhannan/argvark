// Extract the Get Variables from the url
function ExtractUrlVars() 
{
    // Create object rather than array
    var vars = {};
    // Obtains the url query part. substring(1) skips the ?.
    var query = window.location.search.substring(1);
    // Split into array of var=value strings
    var varPairs = query.split('&');
    // Loop over varPairs
    var noOfVars = varPairs.length;
    for (var varIndex = 0; varIndex < noOfVars; varIndex++) 
    {
        // Split the var pair
        var varPair = varPairs[varIndex].split('=');
        // Set the key/value entry
        vars[varPair[0]] = varPair[1];
    }
    return vars;
}

function ExtractGetVarValue(varName) 
{
    var getVars = ExtractUrlVars();
    var varValue = getVars[varName];
    return varValue;
}

function ExtractUrlVarOrder() 
{
    // Create indexed array
    var varOrder = new Array();
    // Obtains the url query part. substring(1) skips the ?.
    var query = window.location.search.substring(1);
    // Split into array of var=value strings
    var varPairs = query.split('&');
    // Loop over varPairs
    var noOfVars = varPairs.length;
    for (var varIndex = 0; varIndex < noOfVars; varIndex++) 
    {
        // Split the var pair
        var varPair = varPairs[varIndex].split('=');
        // Set the key/value entry
        varOrder[varIndex] = varPair[0];
    }
    return varOrder;
}

    // not used
function GetUrlToken(first)
{
    var token;
    if (first == true)
    {
        token = "?";
    }
    else
    {
        token = "&";
    }
    //first = false;
    
    return token;
}

