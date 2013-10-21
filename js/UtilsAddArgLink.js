    // 
    // Constructor
    // 
function UtilsAddArgLink()
{
}

    // All Names
UtilsAddArgLink.prototype.jqueryIdNewArgText = "#newArgText";
UtilsAddArgLink.prototype.jqueryIdExistingArgText = "#existingArgText";
UtilsAddArgLink.prototype.jqueryIdNewArgTextCancel = "#newArgTextCancel";
UtilsAddArgLink.prototype.jqueryIdExistingArgTextCancel = "#existingArgTextCancel";
UtilsAddArgLink.prototype.jqueryIdNewArgTextInput = "#newArgTextInput";
UtilsAddArgLink.prototype.jqueryIdExistingArgTextInput = "#existingArgTextInput";

//UtilsAddArgLink.prototype.jqueryIdNewArgButton = "#newArgButton";
//UtilsAddArgLink.prototype.jqueryIdExistingArgButton = "#existingArgButton";
UtilsAddArgLink.prototype.jqueryIdAddArgLinkNewArgText = "#newArgTextInput";
UtilsAddArgLink.prototype.jqueryIdAddArgLinkArgId = "#existingArgTextInput";
//UtilsAddArgLink.prototype.jqueryIdAddArgLinkNewArgText = "#createArgLinkNewArgText";
//UtilsAddArgLink.prototype.jqueryIdAddArgLinkArgId = "#createArgLinkArgId";
UtilsAddArgLink.prototype.jqueryIdArgLinkArgIdClipboardList = "#argLinkArgIdClipboardList";
UtilsAddArgLink.prototype.jqueryIdAddArgLinkArgIdLinkText = "#createArgLinkArgIdLinkText";
UtilsAddArgLink.prototype.jqueryIdAddArgLinkGoButton = "#createArgLinkGo";
UtilsAddArgLink.prototype.jqueryIdArgLinkClipboardSelect = "#argLinkClipboardSelect";
UtilsAddArgLink.prototype.radioAddArgLinkMethod = "RadioCreateArgLinkMethod";
UtilsAddArgLink.prototype.radioValueMethodNewArg = "MethodNewArg";
UtilsAddArgLink.prototype.radioValueMethodExistingArg = "MethodExistingArg";
UtilsAddArgLink.prototype.radioAddArgLinkStance = "RadioCreateArgLinkStance";
UtilsAddArgLink.prototype.radioValueSupports = "0";
UtilsAddArgLink.prototype.radioValueOpposes = "1";
UtilsAddArgLink.prototype.radioValueAssumption = "2";
UtilsAddArgLink.prototype.visibleNone = "None";
UtilsAddArgLink.prototype.visibleNew = "New";
UtilsAddArgLink.prototype.visibleExisting = "Existing";
UtilsAddArgLink.prototype.visibleBoth = "Both";
    // This is in the loaded html - AddArgLink.html
UtilsAddArgLink.prototype.elementNameAddArgLinkSide = "createArgLinkSide";
    // This is put in the generated html
UtilsAddArgLink.prototype.elementNameArgLinkClipboardSelect = "argLinkClipboardSelect";

UtilsAddArgLink.prototype.elementNameMethodNewArg = "createArgLinkMethodNewArg";
UtilsAddArgLink.prototype.elementNameMethodExistingArg = "createArgLinkMethodExistingArg";
//UtilsAddArgLink.prototype.eventNameAddArgLinkLoaded = "AddArgLinkLoaded";
UtilsAddArgLink.prototype.eventNameArgLinkAdded = "AddArgLinkAdded";
UtilsAddArgLink.prototype.eventNameExistingArgLinkAdded = "AddExistingArgLinkAdded";
UtilsAddArgLink.prototype.debugOutputPrefixAddArgLink = "AddArgLink";
UtilsAddArgLink.prototype.debugOutputPrefixLoadAddArgLink = "LoadAddArgLink";


UtilsAddArgLink.prototype.Init = function(eventHandler, navigation)
{
    this.eventHandler = eventHandler;
    this.navigation = navigation;
}

  

    // 
    // Bind
    //


UtilsAddArgLink.prototype.Bind = function()
{
    var thisObject = this;

    // Input box entry
    $(this.jqueryIdNewArgTextInput).change(function(){thisObject.AddArgLink();});
    $(this.jqueryIdExistingArgTextInput).change(function(){thisObject.AddExistingArgLink();});
}
  

    // 
    // Event Handlers
    //

               
UtilsAddArgLink.prototype.AddArgLink = function()
{                     
    var thisObject = this;        
                
    // Get the new arg title text
    var newArgTitleText = $(this.jqueryIdAddArgLinkNewArgText).val();

    // Get the current arg value from the url (could possibly set this on load)
    var parentArgId = this.navigation.argId;
      
    // Add json data to send to update, by POST
    var jsonPostData = {id_parent:parentArgId, id_child:-1, arg_link_title_text:newArgTitleText};
    
    // Send by POST
    g_debug.DisplayPostRequestPrefix(this.debugOutputPrefixAddArgLink, g_config.m_addArgLinkPhp, jsonPostData);
    $.post(g_config.m_addArgLinkPhp, jsonPostData, function(text)
    {
        thisObject.eventHandler.fire(thisObject.eventNameArgLinkAdded);
        $(thisObject.jqueryIdAddArgLinkNewArgText).val("");

        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(this.debugOutputPrefixAddArgLink, text);
    });
}


UtilsAddArgLink.prototype.AddExistingArgLink = function()
{                                         
    var thisObject = this;
    var parentArgId = this.navigation.argId;  

    // Get the id set in the edit box
    var editBoxArgId = $(this.jqueryIdAddArgLinkArgId).val();

    // Just done this as an error value - it will be ignored (-1 will create new arg)
    var childArgId = -2;
    if (editBoxArgId != "")
    {
        childArgId = editBoxArgId;
    }
    
    // Create json data to send to update, by POST
    var jsonPostData = {id_parent:parentArgId, id_child:childArgId, arg_link_title_text:""};
    
    // Send by POST
    g_debug.DisplayPostRequestPrefix(this.debugOutputPrefixAddArgLink, g_config.m_addArgLinkPhp, jsonPostData);                                    
    $.post(g_config.m_addArgLinkPhp, jsonPostData, function(text)
    {
        thisObject.eventHandler.fire(thisObject.eventNameExistingArgLinkAdded);
        $(thisObject.jqueryIdAddArgLinkArgId).val("");

        // No need to reload the data. Just debug output.
        g_debug.DisplayPhpOutputPrefix(thisObject.debugOutputPrefixAddArgLink, text);
    });
}


