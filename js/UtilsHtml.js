// Constructor
function UtilsHtml()
{
}


UtilsHtml.prototype.Button = function(id, buttonText, enabled)
{
    //var html = '<button id="' + id + '" type="button">' + buttonText + '</button>';
    var html = '<button id="' + id + '" type="button"';
    if (!enabled)
    {
        html += ' disabled';
    }
    html += '>' + buttonText + '</button>';
    return html;
}

UtilsHtml.prototype.Checkbox = function(id, text, boolValue, enabled)
{
    // It seems that putting the attribute name 'checked' determines if it is checked or not
    var checkedText = boolValue ? ' checked' : '';
    var enabledText = enabled ? '' : ' disabled';
    var html = '<input id="' + id + '" type="checkbox"' + checkedText + enabledText + '>' + text + '</input>';
    return html;
}

UtilsHtml.prototype.Hyperlink = function(url, text, newTab)
{
    var html = '';
    html += '<a href = "' + url + '"';
    if (newTab)
    {
        html += ' target = "_blank"';
    }
    html += '>';
    html += text + '</a>';
    return html;
}

UtilsHtml.prototype.Option = function(value, text)
{
    var html = '<option value="' + value + '">' + text + '</option>';
    return html;
}


UtilsHtml.prototype.ButtonTableEntry = function(id, buttonText, enabled)
{
    var html = this.Button(id, buttonText, enabled);
    var tableEntryHtml = this.WrapInTableEntry(html);
    return tableEntryHtml;
}

UtilsHtml.prototype.CheckboxTableEntry = function(id, text, value, enabled)
{
    var html = this.Checkbox(id, text, value, enabled);
    var tableEntryHtml = this.WrapInTableEntry(html);
    return tableEntryHtml;
}

UtilsHtml.prototype.HyperlinkTableEntry = function(url, text, newTab)
{
    var html = this.Hyperlink(url, text, newTab);
    var tableEntryHtml = this.WrapInTableEntry(html);
    return tableEntryHtml;
}

UtilsHtml.prototype.WrapInTableEntry = function(html)
{
    var tableEntryHtml = '<td>' + html + '</td>';
    return tableEntryHtml;
}

UtilsHtml.prototype.WrapInTableRow = function(html)
{
    var tableRowHtml = '<tr>' + html + '</tr>';
    return tableRowHtml;
}

UtilsHtml.prototype.WrapInTable = function(html)
{
    var tableHtml = '<table border="1">' + html + '</table>';
    return tableHtml;
}

UtilsHtml.prototype.WrapInBold = function(html)
{
    var boldHtml = '<b>' + html + '</b>';
    return boldHtml;
}

UtilsHtml.prototype.WrapInDiv = function(html)
{
    var divHtml = '<div>' + html + '</div>';
    return divHtml;
}

UtilsHtml.prototype.TableHeading = function(heading)
{
    var tableHeading = '<tr><th>' + heading + '</th></tr>';
    return tableHeading;
}

UtilsHtml.prototype.WrapInSelect = function(html, id)
{
    var selectHtml = '<select id="' + id + '">' + html + '</select>';
    return selectHtml;
}

    // This creates a unique element id, from a property e.g. argLink, and an entry id e.g. 34
UtilsHtml.prototype.CreateElementId = function(propertyName, entryId, addJQueryId)
{
    var elementId = '';
    if (addJQueryId == true)
    {
        elementId += '#';
    }
    elementId += propertyName + entryId;
    return elementId;
}
UtilsHtml.prototype.CreateElementIdP = function(elementsPrefix, propertyName, entryId, addJQueryId)
{
    var elementId = '';
    if (addJQueryId == true)
    {
        elementId += '#';
    }
    elementId += elementsPrefix + propertyName + entryId;
    return elementId;
}


    // Return value of selected radio button, by groupName 
UtilsHtml.prototype.GetSelectedRadioButtonValue = function(groupName)
{                                         
    // Warning: This doesn't distinguish radio buttons from other types of buttons
    var buttonValue = "";
    var radioButtons = document.getElementsByName(groupName);
    $.each(radioButtons, function(index, button){
        if (button.checked) 
        {
            buttonValue = button.value;
        }
    });
    return buttonValue;
}

UtilsHtml.prototype.SetSelectedRadioButton = function(groupName, buttonId)
{    
    var button = document.getElementById(buttonId);                                     
    button.checked = true;
}

UtilsHtml.prototype.GetSelectedOptionValue = function(selectObjectId)
{                                         
    var selectObject = document.getElementById(selectObjectId);
    var options = selectObject.options;
    var value = options[selectObject.selectedIndex].value
    return value;
}

UtilsHtml.prototype.EmptyHtml = function()
{
    return '';
}

UtilsHtml.prototype.EnableButton = function(buttonId)
{    
    var button = document.getElementById(buttonId);                                     
    button.disabled = false;
}

UtilsHtml.prototype.DisableButton = function(buttonId)
{    
    var button = document.getElementById(buttonId);                                     
    button.disabled = true;
}

UtilsHtml.prototype.SetButtonText = function(buttonId, text)
{    
    var button = document.getElementById(buttonId);                                     
    button.innerHTML = text;
}

UtilsHtml.prototype.GetCheckboxValue = function(checkboxElementId)
{                                         
    var checkboxObject = document.getElementById(checkboxElementId);
    var checkboxValue = checkboxObject.checked;
    return checkboxValue;
}

UtilsHtml.prototype.SetCheckboxValue = function(checkboxElementId, checkboxValue)
{                                         
    var checkboxObject = document.getElementById(checkboxElementId);
    // Set checked with a boolean value, but checkboxValue is numeric
    if (checkboxValue == 1)
    {
        checkboxObject.checked = true;
    }
    else
    {
        checkboxObject.checked = false;
    }
}


UtilsHtml.prototype.DisplayEmptyJsonDataMessage = function(jsonData, jqidMessage, message)
{
    if (jsonData.length == 0)
    {
        $(jqidMessage).html(message);
    }
    else
    {
        $(jqidMessage).html("");
    }
}


