const timeWord = require('./timeWord');

describe('#timeword', () => {
  test('it is a function', () => {
    expect(typeof timeWord).toBe('function');
  });

  test('special words like noon and midnight are treated correctly', function(){
    let response = timeWord('00:00');
    expect(response).toEqual('midnight');

    let response2 = timeWord('12:00');
    expect(response2).toEqual('noon');
  });

  test('examples of various am hours', function (){
    expect(timeWord('00:12')).toEqual('twelve twelve am');
    expect(timeWord('06:10')).toEqual('six ten am');
    expect(timeWord('06:18')).toEqual('six eighteen am');
    expect(timeWord('06:30')).toEqual('six thirty am');
    expect(timeWord('10:34')).toEqual('ten thirty four am');
  });
  
  test('changes hours greater than 12 and adds pm', function(){
    expect(timeWord('12:34')).toEqual('twelve thirty four pm');
    expect(timeWord('16:15')).toEqual('four fifteen pm');
    expect(timeWord('19:59')).toEqual('seven fifty nine pm');
    expect(timeWord('20:27')).toEqual('eight twenty seven pm');
  });
  
  test('when minutes are less than 10 will use oh before', function (){
    expect(timeWord('02:09')).toEqual('two oh nine am');
    expect(timeWord('10:07')).toEqual('ten oh seven am');
    expect(timeWord('12:02')).toEqual('twelve oh two pm');
    expect(timeWord('15:06')).toEqual('three oh six pm');
    expect(timeWord('21:01')).toEqual('nine oh one pm');
  });
  
  test("returns o'clock when 00 in the minutes", function (){
    expect(timeWord('03:00')).toEqual("three o'clock am");
    expect(timeWord('21:00')).toEqual("nine o'clock pm");
  });
  
  test("won't return if hour format does not conform to HH:MM", function(){
    expect(timeWord('214:00')).toEqual("Invalid hour format. It should be the following HH:MM");
    expect(timeWord('02:324')).toEqual("Invalid hour format. It should be the following HH:MM");    
  });

  test("won't accept hours over 23", function (){
    expect(timeWord('96:32')).toEqual("Invalid hour format. Hours should be between 00 and 23");
    expect(timeWord('26:32')).toEqual("Invalid hour format. Hours should be between 00 and 23");
  });
  
  test("won't accept minutes over 59", function (){
    expect(timeWord('23:69')).toEqual("Invalid minute format. Minutes should be between 00 and 59");
    expect(timeWord('23:99')).toEqual("Invalid minute format. Minutes should be between 00 and 59");
  });
  
});