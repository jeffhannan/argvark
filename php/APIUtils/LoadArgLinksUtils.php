<?php
// Jeff Hannan

function loadarglinks_check_vars()
{
    $error_message = null;
    
    list ($arg_is_set, $arg_value) = utils_get_var_numeric("id_argument");
    list ($direction_is_set, $direction_value) = utils_get_var_numeric("link_direction");      

    // Check vars
    $success = ($arg_is_set && $direction_is_set);
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $arg_value, $direction_value);
}


function loadarglinks_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load)
{
    $output_array = array();
    $array_records = array();
    $array_fields = array();
    
    $record_index = 0;
    while($row = mysql_fetch_array($result_select)){
  
        // Fields
        $array_fields['id_relationship'] = $row['id_relationship'];
        $array_fields['id_parent'] = $row['id_parent'];
        $array_fields['id_child'] = $row['id_child'];
        $array_fields['title'] = $row['title'];
        $array_fields['selection_count'] = $row['selection_count'];
        
        // Records
        $array_records[$record_index] = $array_fields;
        $record_index++;
        
        // Only write out $no_of_entries_in_page
        if ($record_index >= $no_of_entries_in_page){
            break;
        }
    }
    // Add to $output_array 2 entries 
    $output_array['array_records'] = $array_records;
    // A flag for more pages. There are more pages if the query managed to load the extra record requested.
    $output_array['more'] = (mysql_num_rows($result_select) == $no_of_entries_to_load);
     
    // There may be 0 or more records
    $json = json_encode($output_array);
    
    return array($json);    
}


?> 
