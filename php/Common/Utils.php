<?php
// Jeff Hannan

function utils_init_api()
{
    $success = true;
    $error_message = null;
    $connection = null;
    $json = null;

    set_error_handler("custom_error_function");
        
    return array($success, $error_message, $connection, $json);
}

function utils_create_site_error_message($message)
{
    $error_message = "Website error: <br>" . "$message";
    
    return $error_message;
}

function utils_create_user_error_message($message)
{
    $error_message = "API parameter error: <br>" . "$message";
    
    return $error_message;
}

function utils_prepend_error_message($error_message, $info)
{
    $error_message = $info . "<br>" . $error_message;
    
    return $error_message;
} 



function utils_var_string($var_value)
{
// Probably need to check isset first before accessing. That's why I get php errors if it is not set.
    $is_set = isset($var_value) && is_string($var_value);
    $is_empty = ($var_value == "");
    
    return array($is_set, $is_empty, $var_value);
}

function utils_var_numeric($var_value)
{
    $is_set = isset($var_value) && is_numeric($var_value);
    
    return array($is_set, $var_value);
}

function utils_post_var_string($var_name)
{
// This seems to work in terms of avoiding the error
    if (!isset($_POST[$var_name]))
    {
    return array(false, true, null);
    }
    $var_value = $_POST[$var_name];
    // Do this to get urldecoded
    // php manual says $_REQUEST is urldecoded, but I got an encoded result. So to avoid confusion, will use an un-decoded POST value
    //$var_value = $_REQUEST[$var_name];
    
    //return var_string($var_value);
    $is_set = isset($var_value) && is_string($var_value);
    $is_empty = ($var_value == "");
    $decoded_string = urldecode($var_value);
    
    return array($is_set, $is_empty, $decoded_string);
}

function utils_post_var_numeric($var_name)
{
/*
    if ()
    $is_set = isset($var_value) && is_numeric($var_value);
    
    return array($is_set, $var_value);
    */
    $var_value = $_POST[$var_name];
    
    return utils_var_numeric($var_value);
}

function utils_get_var_string($var_name)
{
/*
    $is_set = false;
    if (isset($var_name)){
    }
    $is_set = isset($var_name) && is_string($var_value);
    $is_empty = ($var_value == "");
    
    return array($is_set, $is_empty, $var_value);
    */
    $var_value = $_GET[$var_name];
    
    return utils_var_string($var_value);
}

function utils_get_var_numeric($var_name)
{
    $is_set = false;
    $var_value = null;
    if (isset($_GET[$var_name])){
        $var_value = $_GET[$var_name];
        $is_set = is_numeric($var_value);
    }
    
    return array($is_set, $var_value);
    //$var_value = $_GET[$var_name];
    
    //return var_numeric($var_value);
}





function utils_get_page_info($page_is_set, $page_value, $page_length_is_set, $page_length_value, $default_no_of_entries)
{
    if ($page_is_set && $page_length_is_set){
        $no_of_entries_in_page = $page_length_value;
        $entries_start = $page_value * $no_of_entries_in_page;
    }
    else {
        $no_of_entries_in_page = 5;
        $entries_start = 0;
    }
    // Load $page_length_value + 1, but only display $page_length_value. Just a way of telling if run out of arguments.
    $no_of_entries_to_load = $no_of_entries_in_page + 1;
                
    return array($no_of_entries_to_load, $no_of_entries_in_page, $entries_start);
}

function utils_get_page_info_from_vars()
{
    // No need to return success or error because these are optional. Defaults are used otherwise.
    
    list ($page_is_set, $page_value) = utils_get_var_numeric("page");
    list ($page_length_is_set, $page_length_value) = utils_get_var_numeric("page_length");

    list ($no_of_entries_to_load, $no_of_entries_in_page, $entries_start) = utils_get_page_info($page_is_set, $page_value, $page_length_is_set, $page_length_value, 5);
    
    return array($no_of_entries_to_load, $no_of_entries_in_page, $entries_start);
}

        // Given direction, determine which fields are used for SELECT and WHERE in the SQL query
        // Can get links to parents or children, and this is achieved by constructing the SQL query dynamically.
function utils_get_relations($direction_value)
{
    // $direction_value determines which links
    if ($direction_value == 0)
    {
        // Get child links.
        $relation_select = 'id_child';
        $relation_where = 'id_parent';
    }
    else
    {
        // Get parent links.
        $relation_select = 'id_parent';
        $relation_where = 'id_child';
    }
    
    return array($relation_select, $relation_where);
}


// Don't know yet if any of these are called

function utils_get_array_from_values_string($valuesString)
{
    $valuesArray = explode(',', $valuesString);
    
    $numberOfEntries = count($valuesArray);
                
    return array($valuesArray, $numberOfEntries);
}

function utils_convert_values_to_quoted_values($valuesArray)
{
    $quotedValuesArray = array();
    $arrayIndex = 0;
    foreach($valuesArray as $valuesArrayEntry)
    {
        $quotedValuesArray[$arrayIndex] = "'$valuesArrayEntry'";
        $arrayIndex++;
    }
    
    return $quotedValuesArray;
}

function utils_get_string_from_values_array($valuesArray)
{
    $valuesString = implode(',', $valuesArray);
    
    return $valuesString;
}

function utils_get_string_from_quoted_values_array($valuesArray)
{
    $quotedArray = utils_convert_values_to_quoted_values($valuesArray);
    $string = utils_get_string_from_values_array($quotedArray);
    
    return $string;
}




?> 
