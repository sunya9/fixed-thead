describe('FixedThead', function() {
  beforeEach(function() {
    document.body.innerHTML = window.__html__['test/index.html'];
  });

  var successTable = function(option) {
    return new FixedThead('#success-table', option);
  };

  it('Offset top of default fixed-thead must be 0.', function() {
    var fixedThead = new FixedThead('#success-table');
    var cloneThead = document.querySelector('#success-table>thead:first-child');
    var offsetTop = cloneThead.offsetTop;
    expect(offsetTop).toBe(0);
  });

  it('When setting 50 to offsetTop, the offset top must be 50 .', function() {
    var fixedThead = new FixedThead('#success-table', {
      offsetTop: 50
    });
    var cloneThead = document.querySelector('#success-table>thead:first-child');
    var offsetTop = parseInt(cloneThead.style.top);
    expect(offsetTop).toBe(50);
  });

  it('Default fixed-thead is enabled.', function() {
    var fixedThead = new FixedThead('#success-table');
    expect(fixedThead.enabled).toBe(true);
  });

  it('When setting true to enabled option, fixed-thead is disabled.', function() {
    var fixedThead = new FixedThead('#success-table', {
      enabled: false
    });
    expect(fixedThead.enabled).toBe(false);
  });

  it('When body scrolled, thead is fixed(show).', function() {
    var fixedThead = new FixedThead('#success-table');
    document.body.scrollTop = 200;
    // Somehow does not trigger scroll event.
    // So, FixedThead must perform changeStatus internally.
    fixedThead.enabled = true;
    var cloneThead = document.querySelector('#success-table>thead:first-child');
    expect(cloneThead.style.display).toBe('table-header-group');
  });

  it('When pass the table, thead must be hidden.', function() {
    var fixedThead = new FixedThead('#success-table');
    document.body.scrollTop = 700;
    fixedThead.enabled = true;
    var cloneThead = document.querySelector('#success-table>thead:first-child');
    expect(cloneThead.style.display).toBe('none');
  });

  it('Setting p element to selectors, thrown a error.', function() {
    var func = function() {
      new FixedThead('p');
    }
    expect(func).toThrow();
  });

  it('Thrown a error when there is a table element without a thead.', function() {
    var func = function() {
      new FixedThead('#no-thead');
    };
    expect(func).toThrow();
  });
});