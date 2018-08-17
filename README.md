<h2>News Api Oracle</h2>

News API is a simple HTTP REST API for searching and retrieving live articles from all over the web. It can help you answer questions like:

  * What top stories is the NY Times running right now?
  * What new articles were published about the next iPhone today?
  * Has my company or product been mentioned or reviewed by any blogs recently?

  <b>Address: 0x5Df6ACc490a34f30E20c740D1a3Adf23Dc4D48A2</b>
  
  <b>Endpoint: NewsApi</b>

<h2>Endpoint Params:</h2>
NOTE: 
		
  * Not all parameters are required, but MUST take in at least 1 parameter!
		
  * all endpoint params are strings. 
		
  * use 1 character of whitespace to input empty parameters on zap term
  
1.  country

    *  The 2-letter ISO 3166-1 code of the country you want to get headlines for. Possible options: ae ar at au be bg br ca ch cn co cu cz de eg fr gb gr hk hu id ie il in it jp kr lt lv ma mx my ng nl no nz ph pl pt ro rs ru sa se sg si sk th tr tw ua us ve za . 
  
    *  <b>Note: you can't mix this param with the sources param!!!</b>

2.  category

    *  The category you want to get headlines for. Possible options: business entertainment general health science sports technology . 
  
    *  <b>Note: you can't mix this param with the sources param!!!</b>

3.  sources

    *  A comma-seperated string of identifiers for the news sources or blogs you want headlines from. Use the /sources endpoint to locate these programmatically or look at the sources index. 

    *  <b>Note: you can't mix this param with the country or category params!!!</b>
	
4.  keywords

       *  Keywords or a phrase to search for.
