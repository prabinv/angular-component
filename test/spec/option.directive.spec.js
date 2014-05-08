'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnOption', function() {

  // load the directive's module
  beforeEach(module('vn.option'));

  var $rootScope;
  var $compile;

  // ReSharper disable InconsistentNaming
  beforeEach(inject(function(_$rootScope_, _$compile_) {
    // ReSharper restore InconsistentNaming
    $rootScope = _$rootScope_;
    $compile = _$compile_;
  }));

  function compile(options) {
    options = options || {};
    var extend = options.extend || function(elem) { return elem; };
    var $div = extend(angular.element('<div data-vn-option/>')
      .attr('data-option', 'option')
      .attr('data-name', '{{name}}'));
    var template = $compile($div);
    var $scope = options.scope || $rootScope.$new();
    var $component = template(addFixtureData($scope));
    $rootScope.$digest();
    return $component;
  }

  function addFixtureData($scope) {
    $scope.option = $scope.option || {};
    $scope.option.name = 'option1';
    return $scope;
  }

  function createScopeOption(option) {
    return createScope({
      option: option
    });
  }

  function createScope(props) {
    var $scope = $rootScope.$new();
    return angular.extend($scope, props);
  }

  it('replaces content with a vn-option block', function() {
    var $component = compile();
    expect($component).to.have.class('vn-option');
  });

  it('generates a label', function() {
    var $component = compile({
      scope: createScopeOption({
        label: 'foo'
      })
    });
    var $label = $component.find('.vn-option__label');
    expect($label).to.have.text('foo');
  });

  describe('display types', function() {

    var $component;
    var $scope;
    before(function() {
      $scope = createScopeOption({
        displayTypes: [
          { type: 'radios' },
          { type: 'select', size: 5 } // TODO: support multiple: true
        ],
        items: [
          {
            text: 'fooText',
            value: 'fooValue',
            color: '#f00;',
            image: 'data:image/jpeg;base64,foo'
          },
          {
            text: 'barText',
            value: 'barValue',
            color: '#b00',
            image: 'data:image/jpeg;base64,bar'
          }
        ]
      });
      $scope.selected = { item: $scope.option.items[1] };
      $component = compile({
        scope: $scope,
        extend: function($elem) {
          return $elem
            .attr('data-display-types', 'option.displayTypes')
            .attr('data-items', 'option.items')
            .attr('data-ng-model', 'selected.item');
        }
      });
    });

    it('generates labeled radios', function() {

      var $labeledRadios = $component.find('.vn-option__group--radios .vn-labeled-radio');

      function testLabeledRadio($labeledRadio, fixture) {
        var $radio = $labeledRadio.find('.vn-labeled-radio__input');
        var $label = $labeledRadio.find('.vn-labeled-radio__label');
        var $image = $labeledRadio.find('.vn-labeled-radio__image');
        expect($labeledRadio).to.have.attr('name', 'option1');
        expect($labeledRadio).to.have.css('background-color', fixture.backgroundColor);
        expect($radio).to.have.value(fixture.value);
        expect($image).to.have.attr('src', fixture.image);
        expect($label).to.have.text(fixture.text);
      }

      testLabeledRadio($labeledRadios.first(), {
        text: 'fooText',
        value: 'fooValue',
        backgroundColor: 'rgb(255, 0, 0)',
        image: 'data:image/jpeg;base64,foo'
      });

      testLabeledRadio($labeledRadios.last(), {
        text: 'barText',
        value: 'barValue',
        backgroundColor: 'rgb(187, 0, 0)',
        image: 'data:image/jpeg;base64,bar'
      });
    });

    describe('select box', function() {

      it('generates a select box', function() {
        var $select = $component.find('.vn-option__group--select select');
        expect($select).to.have.attr('name', 'option1');

        var $options = $select.children('option');
        expect($options.length).to.eq(2);

        function testOption($option, fixture) {
          expect($option).to.have.text(fixture.text);
          if (fixture.selected) {
            expect($option).to.be.selected;
          }
        }

        testOption($options.first(), {
          text: 'fooText'
        });

        testOption($options.last(), {
          text: 'barText',
          selected: true
        });
      });

      it('copies the size attribute into the select box', function() {
        var $select = $component.find('.vn-option__group--select select');
        expect($select).to.have.attr('size', '5');
      });

    });

  });

  it('recursively shows sub-options', function() {
    var $component = compile();
    expect($component).to.not.have('.vn-option');

    $component = compile({
      scope: createScopeOption({
        options: [
          { label: 'foo', options: [{ label: 'bar' }] },
          { label: 'baz' }
        ]
      })
    });

    var $options = $component.find('.vn-option');
    expect($options.length).to.be(3);

    var $labels = $component.find('.vn-option__label');
    expect($($labels.get(0))).to.have.text('foo');
    expect($($labels.get(1))).to.have.text('bar');
    expect($($labels.get(2))).to.have.text('baz');
  });
});
