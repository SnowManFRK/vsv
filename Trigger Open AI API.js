(function executeRule(current, previous /*null when async*/ ) {
    try {
        var r = new sn_ws.RESTMessageV2('Open AI', 'GetAIResponse');
        r.setStringParameterNoEscape('prompt', current.u_promt);

        var response = r.execute();
        var responseBody = response.getBody();
        var httpStatus = response.getStatusCode();
        if (httpStatus == 200) {
            var ans = JSON.parse(responseBody); // Extract content from the parsed JSON
            var content = ans.choices[0].message.content;
            current.u_response = content;
           current.update();
        } else { // Handle HTTP error 
            gs.addErrorMessage('HTTP Error: ' + ans);
        }
    } catch (ex) { // Handle exception 
        var message = ex.message;
        gs.addErrorMessage('Exception: ' + message);
    }
})(current, previous);