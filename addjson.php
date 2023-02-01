<?php
if(file_exists('data.json'))
{
    $current_data = file_get_contents('data.json');
    $array_data = json_decode($current_data, true);
    $extra = array(
         'name'               =>    'name',
         'gender'          =>     'gender',
         'age'          =>     'age'
         

    );
    $array_data[] = $extra;
    $final_data = json_encode($array_data);
    file_put_contents('data.json', $final_data);
}
?>