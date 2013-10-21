// id debugOutput contains the whole table
// ids phpRequest, phpPost, phpOutput contain the entries in the table to set (all optional)

function UtilsDebug()
{
    this.utilsHtml = new UtilsHtml();   
}


UtilsDebug.prototype.CreateElementId = function(prefix, debugOutputId, addJQueryId)
{
    elementId = this.utilsHtml.CreateElementId(prefix, debugOutputId, addJQueryId);
    return elementId;
}




UtilsDebug.prototype.Clear = function()
{
    $(g_config.m_debugOutputJQID).html("");
}

UtilsDebug.prototype.DisplayPhpRequestUrlPrefix = function(prefix, phpRequestUrl)
{
    if (!g_config.m_displayDebug) return;
    
    var textLine = this.WrapDebugEntryInTable(prefix, "REQUEST URL", phpRequestUrl);

    // Append to debug output
    $(g_config.m_debugOutputJQID).append(textLine);
}                   

UtilsDebug.prototype.DisplayPostDataPrefix = function(prefix, postJsonData)
{
    if (!g_config.m_displayDebug) return;
    
    // Stringify the Json for display
    var jsonText = JSON.stringify(postJsonData);

    var textLine = this.WrapDebugEntryInTable(prefix, "REQUEST POST", jsonText);

    // Append to debug output
    $(g_config.m_debugOutputJQID).append(textLine);
}



UtilsDebug.prototype.WrapDebugEntryInTable = function(prefix, label, text)
{
    // Create a one line table in html to contain the info
    var table = '<table border="1"><tr><td>' + prefix + '</td><td>' + label + '</td><td>' + text + '</td></tr></table>';
    return table;
}

UtilsDebug.prototype.DisplayPhpOutputPrefix = function(prefix, phpOutput)
{
    if (!g_config.m_displayDebug) return;
        
    var textLine = this.WrapDebugEntryInTable(prefix, "PHP OUTPUT", phpOutput);

    // Append to debug output
    $(g_config.m_debugOutputJQID).append(textLine);
}


UtilsDebug.prototype.DisplayJsonPhpOutputPrefix = function(prefix, phpJsonOutput)
{
    if (!g_config.m_displayDebug) return;
        
    // Stringify the Json for display
    var jsonText = JSON.stringify(phpJsonOutput);   

    var textLine = this.WrapDebugEntryInTable(prefix, "PHP JSON OUTPUT", jsonText);

    // Append to debug output
    $(g_config.m_debugOutputJQID).append(textLine);
}

UtilsDebug.prototype.DisplayPostRequestPrefix = function(prefix, phpRequestUrl, postData)
{
    this.DisplayPhpRequestUrlPrefix(prefix, phpRequestUrl);
    this.DisplayPostDataPrefix(prefix, postData);
}

UtilsDebug.prototype.DisplayPhpOutputTextJsonPrefix = function(prefix, phpOutput, phpJsonOutput)
{
    this.DisplayPhpOutputPrefix(prefix, phpOutput);
    this.DisplayJsonPhpOutputPrefix(prefix, phpJsonOutput);
}



    // This shouldn't be in debug, because it is not optional. Needs to just go in utils. 
UtilsDebug.prototype.ParseJSON = function(jsonCandidateText)
{
    var jsonData;
    try
    {
        jsonData = jQuery.parseJSON(jsonCandidateText);
    }
    catch(e)
    {
        jsonData = null;
    }
    return jsonData;
}

