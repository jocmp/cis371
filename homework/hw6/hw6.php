<?php

function create_dom() {
    header('Content-Type: text/xml');
    $dom = new DOMDocument('1.0', 'utf-8');
    $dom->preserveWhiteSpace = false;
    $dom->formatOutput = true;
    $root = $dom->createElement('result');
    $dom->appendChild($root);
    $companies = get_companies();
    foreach ($companies as $company) {
        // Create company element
        $company_root = $dom->createElement('company');
        $root->appendChild($company_root); 
        foreach ($company as $elem => $value) {
            $company_elem = $dom->createElement($elem);
            // Append child
            $company_root->appendChild($company_elem);
            // Append child node information 
            $company_elem->appendChild($dom->createTextNode($value));
        }
    }
    echo $dom->saveHTML();

}

function get_companies() {
    $response = file_get_contents('http://www.cis.gvsu.edu/~scrippsj/cs371/hw/fortune500.json');
    $fortune500 = json_decode($response, true);
    return $fortune500['result'];
}

create_dom();

?>
