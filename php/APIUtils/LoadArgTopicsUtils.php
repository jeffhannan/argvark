<?php
// Jeff Hannan

function loadargtopics_check_vars()
{
    $error_message = null;
    
    list ($arg_is_set, $arg_value) = utils_get_var_numeric("id_argument");

    // Check vars
    $success = $arg_is_set;
    if (!$success) { $error_message = utils_create_user_error_message("Vars not set correctly"); }
    
    // Return only the required info
    return array($success, $error_message, 
        $arg_value);
}


function loadargtopics_create_json($result_select, $no_of_entries_in_page, $no_of_entries_to_load)
{
    $output_array = array();
    $array_records = array();
    $array_fields = array();

    $record_index = 0;
    while($row = mysql_fetch_array($result_select)){
        $array_fields['id_tag'] = $row['id_tag'];
        $array_fields['id_argument'] = $row['id_argument'];
        $array_fields['id_topic'] = $row['id_topic'];
        $array_fields['name'] = $row['name'];
        
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
