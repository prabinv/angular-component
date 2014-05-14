'use strict';

// ReSharper disable WrongExpressionStatement
describe('Directive: vnProductOption', function() {

  // load the directive's module
  beforeEach(module('vnProductOption'));

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
    var $div = extend(angular.element('<div data-vn-product-option/>').attr({
      'data-option': 'option',
      'data-name': '{{name}}'
    }));
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

  it('replaces content with a vn-product-option block', function() {
    var $component = compile();
    expect($component).to.have.class('vn-product-option');
  });

  it('generates a label', function() {
    var $component = compile({
      scope: createScopeOption({
        label: 'foo'
      })
    });
    var $label = $component.find('.vn-product-option__label');
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
            color: 'rgb(1, 2, 3);',
            image: 'data:image/jpeg;base64,foo'
          },
          {
            text: 'barText',
            value: 'barValue',
            color: 'rgb(4, 5, 6);',
            image: 'data:image/jpeg;base64,bar'
          }
        ]
      });
      $scope.option.selected = $scope.option.items[1];
      $scope.change = sinon.spy();
      $component = compile({
        scope: $scope,
        extend: function($elem) {
          return $elem.attr({
            'data-vn-modifiers': 'color',
            'data-display-types': 'option.displayTypes',
            'data-items': 'option.items',
            'data-ng-model': 'selected.item',
            'data-ng-change': 'change()'
          });
        }
      });
    });

    it('generates labeled radios', function() {

      var $labeledRadios = $component.find('.vn-product-option__group--radios .vn-labeled-radio');

      function testLabeledRadio($labeledRadio, expected) {
        var $radio = $labeledRadio.find('.vn-labeled-radio__input');
        var $text = $labeledRadio.find('.vn-labeled-radio__text');
        var $image = $labeledRadio.find('.vn-labeled-radio__image');
        expect($labeledRadio).to.have.class('vn-labeled-radio--color');
        expect($labeledRadio).to.have.attr('name', 'option1');
        expect($labeledRadio).to.have.css('background-color', expected.backgroundColor);
        expect($radio).to.have.class('vn-labeled-radio--color__input');
        expect($image).to.have.attr('src', expected.image);
        expect($text).to.have.text(expected.text);
        expect($scope.change).not.to.have.been.called;
        $radio.get(0).click();
        expect($scope.change).to.have.been.calledOnce;
        expect($scope.option.selected).to.deep.equal(expected);
        $scope.change.reset();
      }

      testLabeledRadio($labeledRadios.first(), $scope.option.items[0]);
      testLabeledRadio($labeledRadios.last(), $scope.option.items[1]);
    });

    describe('select box', function() {

      var $select;
      before(function() {
        $select = $component.find('.vn-product-option__group--select select');
      });

      it('generates a select box', function() {
        expect($select).to.have.class('vn-product-option--color__select');
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
        expect($select).to.have.attr('size', '5');
      });

    });

  });

  it('recursively shows sub-options', function() {
    var $component = compile();
    expect($component).to.not.have('.vn-product-option');

    $component = compile({
      scope: createScopeOption({
        options: [
          { label: 'foo', options: [{ label: 'bar' }] },
          { label: 'baz' }
        ]
      })
    });

    var $options = $component.find('.vn-product-option');
    expect($options.length).to.be(3);

    var $labels = $component.find('.vn-product-option__label');
    expect($($labels.get(0))).to.have.text('foo');
    expect($($labels.get(1))).to.have.text('bar');
    expect($($labels.get(2))).to.have.text('baz');
  });
});
