'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _utils = require('./utils');

var _utils2 = _interopRequireDefault(_utils);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

exports.default = function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _utils2.default.compactObject(this.state), _utils2.default.compactObject(this.props), _utils2.default.compactObject(state), _utils2.default.compactObject(props));
        return resolvedState;
      }
    }, {
      key: 'getDataModel',
      value: function getDataModel(newState, dataChanged) {
        var _this2 = this;

        var columns = newState.columns,
            _newState$pivotBy = newState.pivotBy,
            pivotBy = _newState$pivotBy === undefined ? [] : _newState$pivotBy,
            data = newState.data,
            resolveData = newState.resolveData,
            pivotIDKey = newState.pivotIDKey,
            pivotValKey = newState.pivotValKey,
            subRowsKey = newState.subRowsKey,
            aggregatedKey = newState.aggregatedKey,
            nestingLevelKey = newState.nestingLevelKey,
            originalKey = newState.originalKey,
            indexKey = newState.indexKey,
            groupedByPivotKey = newState.groupedByPivotKey,
            SubComponent = newState.SubComponent;

        // Determine if there are Header Groups

        var hasHeaderGroups = columns.some(function (column) {
          return column.columns;
        });

        // Find the expander column which could be deep in tree of columns
        var allColumns = _utils2.default.iterTree(columns, 'columns');
        var expanderColumn = _utils2.default.getFirstDefined(allColumns);

        // If we have SubComponent's we need to make sure we have an expander column
        var hasSubComponentAndNoExpanderColumn = SubComponent && !expanderColumn;
        var columnsWithExpander = hasSubComponentAndNoExpanderColumn ? [{ expander: true }].concat(_toConsumableArray(columns)) : [].concat(_toConsumableArray(columns));

        var makeDecoratedColumn = function makeDecoratedColumn(column, parentColumn) {
          var dcol = void 0;
          if (column.expander) {
            dcol = _extends({}, _this2.props.column, _this2.props.expanderDefaults, column);
          } else {
            dcol = _extends({}, _this2.props.column, _this2.props.column, column);
          }

          // Ensure minWidth is not greater than maxWidth if set
          if (dcol.maxWidth < dcol.minWidth) {
            dcol.minWidth = dcol.maxWidth;
          }

          if (parentColumn) {
            dcol.parentColumn = parentColumn;
          }

          // First check for string accessor
          if (typeof dcol.accessor === 'string') {
            dcol.id = dcol.id || dcol.accessor;
            var accessorString = dcol.accessor;
            dcol.accessor = function (row) {
              return _utils2.default.get(row, accessorString);
            };
            return dcol;
          }

          // Fall back to functional accessor (but require an ID)
          if (dcol.accessor && !dcol.id) {
            console.warn(dcol);
            throw new Error('A column id is required if using a non-string accessor for column above.');
          }

          // Fall back to an undefined accessor
          if (!dcol.accessor) {
            dcol.accessor = function () {
              return undefined;
            };
          }

          return dcol;
        };

        var allDecoratedColumns = [];

        // Decorate the columns
        var decorateAndAddToAll = function decorateAndAddToAll(columns, parentColumn) {
          return columns.map(function (column) {
            var decoratedColumn = makeDecoratedColumn(column, parentColumn);
            if (column.columns) {
              decoratedColumn.columns = decorateAndAddToAll(column.columns, column);
            }

            allDecoratedColumns.push(decoratedColumn);
            return decoratedColumn;
          });
        };

        var decoratedColumns = decorateAndAddToAll(columnsWithExpander);
        var mapVisibleColumns = function mapVisibleColumns(columns) {
          return columns.map(function (column) {
            if (column.columns) {
              var visibleSubColumns = column.columns.filter(function (d) {
                return pivotBy.indexOf(d.id) > -1 ? false : _utils2.default.getFirstDefined(d.show, true);
              });
              return _extends({}, column, {
                columns: mapVisibleColumns(visibleSubColumns)
              });
            }
            return column;
          });
        };

        var filterVisibleColumns = function filterVisibleColumns(columns) {
          return columns.filter(function (column) {
            return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _utils2.default.getFirstDefined(column.show, true);
          });
        };

        // Build the full array of visible columns - this is an array that contains all columns that
        // are not hidden via pivoting
        var allVisibleColumns = filterVisibleColumns(mapVisibleColumns(decoratedColumns.slice()));

        // Find any custom pivot location
        var pivotIndex = allVisibleColumns.findIndex(function (col) {
          return col.pivot;
        });

        // Handle Pivot Columns
        if (pivotBy.length) {
          // Retrieve the pivot columns in the correct pivot order
          var pivotColumns = [];
          pivotBy.forEach(function (pivotID) {
            var found = allDecoratedColumns.find(function (d) {
              return d.id === pivotID;
            });
            if (found) {
              pivotColumns.push(found);
            }
          });

          var PivotParentColumn = pivotColumns.reduce(function (prev, current) {
            return prev && prev === current.parentColumn && current.parentColumn;
          }, pivotColumns[0].parentColumn);

          var PivotGroupHeader = hasHeaderGroups && PivotParentColumn.Header;
          PivotGroupHeader = PivotGroupHeader || function () {
            return _react2.default.createElement(
              'strong',
              null,
              'Pivoted'
            );
          };

          var pivotColumnGroup = {
            Header: PivotGroupHeader,
            columns: pivotColumns.map(function (col) {
              return _extends({}, _this2.props.pivotDefaults, col, {
                pivoted: true
              });
            })

            // Place the pivotColumns back into the visibleColumns
          };if (pivotIndex >= 0) {
            pivotColumnGroup = _extends({}, allVisibleColumns[pivotIndex], pivotColumnGroup);
            allVisibleColumns.splice(pivotIndex, 1, pivotColumnGroup);
          } else {
            allVisibleColumns.unshift(pivotColumnGroup);
          }
        }

        // Build Visible Columns and Header Groups
        var allColumnHeaders = [];

        var addHeader = function addHeader(column) {
          var level = 0;

          // If this column has children, push them first and add this column to the next level
          if (column.columns) {
            var childLevels = column.columns.map(addHeader);
            level = Math.max.apply(Math, _toConsumableArray(childLevels)) + 1;
          }

          // Add spans above columns without parents (orphans) to fill the space above them
          if (allColumnHeaders.length <= level) allColumnHeaders.push([]);
          if (level > 0) {
            // The spans need to contain the shifted headers as children. This finds all of the
            // columns in the lower level between the first child of this column and the last child
            // of the preceding column (if there is one)
            var lowerLevel = allColumnHeaders[level - 1];
            var precedingColumn = _utils2.default.last(allColumnHeaders[level]);

            var indexOfFirstChildInLowerLevel = lowerLevel.indexOf(column.columns[0]);
            var indexAfterLastChildInPrecedingColumn = precedingColumn ? lowerLevel.indexOf(_utils2.default.last(precedingColumn.columns)) + 1 : 0;

            // If there are ophans, add a span above them
            var orphans = lowerLevel.slice(indexAfterLastChildInPrecedingColumn, indexOfFirstChildInLowerLevel);

            if (orphans.length) {
              allColumnHeaders[level].push(_extends({}, _this2.props.column, {
                columns: orphans
              }));
            }
          }

          allColumnHeaders[level].push(column);

          return level;
        };

        allVisibleColumns.forEach(addHeader);

        // visibleColumns is an array containing column definitions for the bottom row of TH elements
        var visibleColumns = allColumnHeaders.shift();
        var headerGroups = allColumnHeaders.reverse();

        // Access the data
        var accessRow = function accessRow(d, i) {
          var _row;

          var level = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

          var row = (_row = {}, _defineProperty(_row, originalKey, d), _defineProperty(_row, indexKey, i), _defineProperty(_row, subRowsKey, d[subRowsKey]), _defineProperty(_row, nestingLevelKey, level), _row);
          allDecoratedColumns.forEach(function (column) {
            if (column.expander) return;
            row[column.id] = column.accessor(d);
          });
          if (row[subRowsKey]) {
            row[subRowsKey] = row[subRowsKey].map(function (d, i) {
              return accessRow(d, i, level + 1);
            });
          }
          return row;
        };

        // // If the data hasn't changed, just use the cached data
        var resolvedData = this.resolvedData;
        // If the data has changed, run the data resolver and cache the result
        if (!this.resolvedData || dataChanged) {
          resolvedData = resolveData(data);
          this.resolvedData = resolvedData;
        }
        // Use the resolved data
        resolvedData = resolvedData.map(function (d, i) {
          return accessRow(d, i);
        });

        // TODO: Make it possible to fabricate nested rows without pivoting
        var aggregatingColumns = visibleColumns.filter(function (d) {
          return !d.expander && d.aggregate;
        });

        // If pivoting, recursively group the data
        var aggregate = function aggregate(rows) {
          var aggregationValues = {};
          aggregatingColumns.forEach(function (column) {
            var values = rows.map(function (d) {
              return d[column.id];
            });
            aggregationValues[column.id] = column.aggregate(values, rows);
          });
          return aggregationValues;
        };
        if (pivotBy.length) {
          var groupRecursively = function groupRecursively(rows, keys) {
            var i = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;

            // This is the last level, just return the rows
            if (i === keys.length) {
              return rows;
            }
            // Group the rows together for this level
            var groupedRows = Object.entries(_utils2.default.groupBy(rows, keys[i])).map(function (_ref) {
              var _ref3;

              var _ref2 = _slicedToArray(_ref, 2),
                  key = _ref2[0],
                  value = _ref2[1];

              return _ref3 = {}, _defineProperty(_ref3, pivotIDKey, keys[i]), _defineProperty(_ref3, pivotValKey, key), _defineProperty(_ref3, keys[i], key), _defineProperty(_ref3, subRowsKey, value), _defineProperty(_ref3, nestingLevelKey, i), _defineProperty(_ref3, groupedByPivotKey, true), _ref3;
            });
            // Recurse into the subRows
            groupedRows = groupedRows.map(function (rowGroup) {
              var _extends2;

              var subRows = groupRecursively(rowGroup[subRowsKey], keys, i + 1);
              return _extends({}, rowGroup, (_extends2 = {}, _defineProperty(_extends2, subRowsKey, subRows), _defineProperty(_extends2, aggregatedKey, true), _extends2), aggregate(subRows));
            });
            return groupedRows;
          };
          resolvedData = groupRecursively(resolvedData, pivotBy);
        }

        return _extends({}, newState, {
          resolvedData: resolvedData,
          visibleColumns: visibleColumns,
          headerGroups: headerGroups,
          allDecoratedColumns: allDecoratedColumns,
          hasHeaderGroups: hasHeaderGroups
        });
      }
    }, {
      key: 'getSortedData',
      value: function getSortedData(resolvedState) {
        var manual = resolvedState.manual,
            sorted = resolvedState.sorted,
            filtered = resolvedState.filtered,
            defaultFilterMethod = resolvedState.defaultFilterMethod,
            resolvedData = resolvedState.resolvedData,
            visibleColumns = resolvedState.visibleColumns,
            allDecoratedColumns = resolvedState.allDecoratedColumns;


        var sortMethodsByColumnID = {};

        allDecoratedColumns.filter(function (col) {
          return col.sortMethod;
        }).forEach(function (col) {
          sortMethodsByColumnID[col.id] = col.sortMethod;
        });

        // Resolve the data from either manual data or sorted data
        return {
          sortedData: manual ? resolvedData : this.sortData(this.filterData(resolvedData, filtered, defaultFilterMethod, allDecoratedColumns), sorted, sortMethodsByColumnID)
        };
      }
    }, {
      key: 'fireFetchData',
      value: function fireFetchData() {
        // determine the current state, preferring certain state values over props
        var currentState = _extends({}, this.getResolvedState(), {
          page: this.getStateOrProp('page'),
          pageSize: this.getStateOrProp('pageSize'),
          filter: this.getStateOrProp('filter')
        });

        this.props.onFetchData(currentState, this);
      }
    }, {
      key: 'getPropOrState',
      value: function getPropOrState(key) {
        return _utils2.default.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _utils2.default.getFirstDefined(this.state[key], this.props[key]);
      }
    }, {
      key: 'filterData',
      value: function filterData(data, filtered, defaultFilterMethod, visibleColumns) {
        var _this3 = this;

        var filteredData = data;

        if (filtered.length) {
          filteredData = filtered.reduce(function (filteredSoFar, nextFilter) {
            var column = visibleColumns.find(function (x) {
              return x.id === nextFilter.id;
            });

            // Don't filter hidden columns or columns that have had their filters disabled
            if (!column || column.filterable === false) {
              return filteredSoFar;
            }

            var filterMethod = column.filterMethod || defaultFilterMethod;

            // If 'filterAll' is set to true, pass the entire dataset to the filter method
            if (column.filterAll) {
              return filterMethod(nextFilter, filteredSoFar, column);
            }
            return filteredSoFar.filter(function (row) {
              return filterMethod(nextFilter, row, column);
            });
          }, filteredData);

          // Apply the filter to the subrows if we are pivoting, and then
          // filter any rows without subcolumns because it would be strange to show
          filteredData = filteredData.map(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return row;
            }
            return _extends({}, row, _defineProperty({}, _this3.props.subRowsKey, _this3.filterData(row[_this3.props.subRowsKey], filtered, defaultFilterMethod, visibleColumns)));
          }).filter(function (row) {
            if (!row[_this3.props.subRowsKey]) {
              return true;
            }
            return row[_this3.props.subRowsKey].length > 0;
          });
        }

        return filteredData;
      }
    }, {
      key: 'sortData',
      value: function sortData(data, sorted) {
        var _this4 = this;

        var sortMethodsByColumnID = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

        if (!sorted.length) {
          return data;
        }

        var sortedData = (this.props.orderByMethod || _utils2.default.orderBy)(data, sorted.map(function (sort) {
          // Support custom sorting methods for each column
          if (sortMethodsByColumnID[sort.id]) {
            return function (a, b) {
              return sortMethodsByColumnID[sort.id](a[sort.id], b[sort.id], sort.desc);
            };
          }
          return function (a, b) {
            return _this4.props.defaultSortMethod(a[sort.id], b[sort.id], sort.desc);
          };
        }), sorted.map(function (d) {
          return !d.desc;
        }), this.props.indexKey);

        sortedData.forEach(function (row) {
          if (!row[_this4.props.subRowsKey]) {
            return;
          }
          row[_this4.props.subRowsKey] = _this4.sortData(row[_this4.props.subRowsKey], sorted, sortMethodsByColumnID);
        });

        return sortedData;
      }
    }, {
      key: 'getMinRows',
      value: function getMinRows() {
        return _utils2.default.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
      }

      // User actions

    }, {
      key: 'onPageChange',
      value: function onPageChange(page) {
        var _props = this.props,
            onPageChange = _props.onPageChange,
            collapseOnPageChange = _props.collapseOnPageChange;


        var newState = { page: page };
        if (collapseOnPageChange) {
          newState.expanded = {};
        }
        this.setStateWithData(newState, function () {
          return onPageChange && onPageChange(page);
        });
      }
    }, {
      key: 'onPageSizeChange',
      value: function onPageSizeChange(newPageSize) {
        var onPageSizeChange = this.props.onPageSizeChange;

        var _getResolvedState = this.getResolvedState(),
            pageSize = _getResolvedState.pageSize,
            page = _getResolvedState.page;

        // Normalize the page to display


        var currentRow = pageSize * page;
        var newPage = Math.floor(currentRow / newPageSize);

        this.setStateWithData({
          pageSize: newPageSize,
          page: newPage
        }, function () {
          return onPageSizeChange && onPageSizeChange(newPageSize, newPage);
        });
      }
    }, {
      key: 'sortColumn',
      value: function sortColumn(column, additive) {
        var _getResolvedState2 = this.getResolvedState(),
            sorted = _getResolvedState2.sorted,
            skipNextSort = _getResolvedState2.skipNextSort,
            defaultSortDesc = _getResolvedState2.defaultSortDesc;

        var firstSortDirection = Object.prototype.hasOwnProperty.call(column, 'defaultSortDesc') ? column.defaultSortDesc : defaultSortDesc;
        var secondSortDirection = !firstSortDirection;

        // we can't stop event propagation from the column resize move handlers
        // attached to the document because of react's synthetic events
        // so we have to prevent the sort function from actually sorting
        // if we click on the column resize element within a header.
        if (skipNextSort) {
          this.setStateWithData({
            skipNextSort: false
          });
          return;
        }

        var onSortedChange = this.props.onSortedChange;


        var newSorted = _utils2.default.clone(sorted || []).map(function (d) {
          d.desc = _utils2.default.isSortingDesc(d);
          return d;
        });
        if (!_utils2.default.isArray(column)) {
          // Single-Sort
          var existingIndex = newSorted.findIndex(function (d) {
            return d.id === column.id;
          });
          if (existingIndex > -1) {
            var existing = newSorted[existingIndex];
            if (existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(existingIndex, 1);
              } else {
                existing.desc = firstSortDirection;
                newSorted = [existing];
              }
            } else {
              existing.desc = secondSortDirection;
              if (!additive) {
                newSorted = [existing];
              }
            }
          } else if (additive) {
            newSorted.push({
              id: column.id,
              desc: firstSortDirection
            });
          } else {
            newSorted = [{
              id: column.id,
              desc: firstSortDirection
            }];
          }
        } else {
          // Multi-Sort
          var _existingIndex = newSorted.findIndex(function (d) {
            return d.id === column[0].id;
          });
          // Existing Sorted Column
          if (_existingIndex > -1) {
            var _existing = newSorted[_existingIndex];
            if (_existing.desc === secondSortDirection) {
              if (additive) {
                newSorted.splice(_existingIndex, column.length);
              } else {
                column.forEach(function (d, i) {
                  newSorted[_existingIndex + i].desc = firstSortDirection;
                });
              }
            } else {
              column.forEach(function (d, i) {
                newSorted[_existingIndex + i].desc = secondSortDirection;
              });
            }
            if (!additive) {
              newSorted = newSorted.slice(_existingIndex, column.length);
            }
            // New Sort Column
          } else if (additive) {
            newSorted = newSorted.concat(column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            }));
          } else {
            newSorted = column.map(function (d) {
              return {
                id: d.id,
                desc: firstSortDirection
              };
            });
          }
        }

        this.setStateWithData({
          page: !sorted.length && newSorted.length || !additive ? 0 : this.state.page,
          sorted: newSorted
        }, function () {
          return onSortedChange && onSortedChange(newSorted, column, additive);
        });
      }
    }, {
      key: 'filterColumn',
      value: function filterColumn(column, value) {
        var _getResolvedState3 = this.getResolvedState(),
            filtered = _getResolvedState3.filtered;

        var onFilteredChange = this.props.onFilteredChange;

        // Remove old filter first if it exists

        var newFiltering = (filtered || []).filter(function (x) {
          return x.id !== column.id;
        });

        if (value !== '') {
          newFiltering.push({
            id: column.id,
            value: value
          });
        }

        this.setStateWithData({
          filtered: newFiltering
        }, function () {
          return onFilteredChange && onFilteredChange(newFiltering, column, value);
        });
      }
    }, {
      key: 'resizeColumnStart',
      value: function resizeColumnStart(event, column, isTouch) {
        var _this5 = this;

        event.stopPropagation();
        var parentWidth = event.target.parentElement.getBoundingClientRect().width;

        var pageX = void 0;
        if (isTouch) {
          pageX = event.changedTouches[0].pageX;
        } else {
          pageX = event.pageX;
        }

        this.trapEvents = true;
        this.setStateWithData({
          currentlyResizing: {
            id: column.id,
            startX: pageX,
            parentWidth: parentWidth
          }
        }, function () {
          if (isTouch) {
            document.addEventListener('touchmove', _this5.resizeColumnMoving);
            document.addEventListener('touchcancel', _this5.resizeColumnEnd);
            document.addEventListener('touchend', _this5.resizeColumnEnd);
          } else {
            document.addEventListener('mousemove', _this5.resizeColumnMoving);
            document.addEventListener('mouseup', _this5.resizeColumnEnd);
            document.addEventListener('mouseleave', _this5.resizeColumnEnd);
          }
        });
      }
    }, {
      key: 'resizeColumnMoving',
      value: function resizeColumnMoving(event) {
        event.stopPropagation();
        var _props2 = this.props,
            onResizedChange = _props2.onResizedChange,
            column = _props2.column;

        var _getResolvedState4 = this.getResolvedState(),
            resized = _getResolvedState4.resized,
            currentlyResizing = _getResolvedState4.currentlyResizing,
            columns = _getResolvedState4.columns;

        var currentColumn = columns.find(function (c) {
          return c.accessor === currentlyResizing.id;
        });
        var minResizeWidth = currentColumn ? currentColumn.minResizeWidth : column.minResizeWidth;

        // Delete old value
        var newResized = resized.filter(function (x) {
          return x.id !== currentlyResizing.id;
        });

        var pageX = void 0;

        if (event.type === 'touchmove') {
          pageX = event.changedTouches[0].pageX;
        } else if (event.type === 'mousemove') {
          pageX = event.pageX;
        }

        var newWidth = Math.max(currentlyResizing.parentWidth + pageX - currentlyResizing.startX, minResizeWidth);

        newResized.push({
          id: currentlyResizing.id,
          value: newWidth
        });

        this.setStateWithData({
          resized: newResized
        }, function () {
          return onResizedChange && onResizedChange(newResized, event);
        });
      }
    }, {
      key: 'resizeColumnEnd',
      value: function resizeColumnEnd(event) {
        event.stopPropagation();
        var isTouch = event.type === 'touchend' || event.type === 'touchcancel';

        if (isTouch) {
          document.removeEventListener('touchmove', this.resizeColumnMoving);
          document.removeEventListener('touchcancel', this.resizeColumnEnd);
          document.removeEventListener('touchend', this.resizeColumnEnd);
        }

        // If its a touch event clear the mouse one's as well because sometimes
        // the mouseDown event gets called as well, but the mouseUp event doesn't
        document.removeEventListener('mousemove', this.resizeColumnMoving);
        document.removeEventListener('mouseup', this.resizeColumnEnd);
        document.removeEventListener('mouseleave', this.resizeColumnEnd);

        // The touch events don't propagate up to the sorting's onMouseDown event so
        // no need to prevent it from happening or else the first click after a touch
        // event resize will not sort the column.
        if (!isTouch) {
          this.setStateWithData({
            skipNextSort: true,
            currentlyResizing: false
          });
        }
      }
    }]);

    return _class;
  }(Base);
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiXyIsImNvbXBhY3RPYmplY3QiLCJuZXdTdGF0ZSIsImRhdGFDaGFuZ2VkIiwiY29sdW1ucyIsInBpdm90QnkiLCJkYXRhIiwicmVzb2x2ZURhdGEiLCJwaXZvdElES2V5IiwicGl2b3RWYWxLZXkiLCJzdWJSb3dzS2V5IiwiYWdncmVnYXRlZEtleSIsIm5lc3RpbmdMZXZlbEtleSIsIm9yaWdpbmFsS2V5IiwiaW5kZXhLZXkiLCJncm91cGVkQnlQaXZvdEtleSIsIlN1YkNvbXBvbmVudCIsImhhc0hlYWRlckdyb3VwcyIsInNvbWUiLCJjb2x1bW4iLCJhbGxDb2x1bW5zIiwiaXRlclRyZWUiLCJleHBhbmRlckNvbHVtbiIsImdldEZpcnN0RGVmaW5lZCIsImhhc1N1YkNvbXBvbmVudEFuZE5vRXhwYW5kZXJDb2x1bW4iLCJjb2x1bW5zV2l0aEV4cGFuZGVyIiwiZXhwYW5kZXIiLCJtYWtlRGVjb3JhdGVkQ29sdW1uIiwicGFyZW50Q29sdW1uIiwiZGNvbCIsImV4cGFuZGVyRGVmYXVsdHMiLCJtYXhXaWR0aCIsIm1pbldpZHRoIiwiYWNjZXNzb3IiLCJpZCIsImFjY2Vzc29yU3RyaW5nIiwiZ2V0Iiwicm93IiwiY29uc29sZSIsIndhcm4iLCJFcnJvciIsInVuZGVmaW5lZCIsImFsbERlY29yYXRlZENvbHVtbnMiLCJkZWNvcmF0ZUFuZEFkZFRvQWxsIiwibWFwIiwiZGVjb3JhdGVkQ29sdW1uIiwicHVzaCIsImRlY29yYXRlZENvbHVtbnMiLCJtYXBWaXNpYmxlQ29sdW1ucyIsInZpc2libGVTdWJDb2x1bW5zIiwiZmlsdGVyIiwiaW5kZXhPZiIsImQiLCJzaG93IiwiZmlsdGVyVmlzaWJsZUNvbHVtbnMiLCJsZW5ndGgiLCJhbGxWaXNpYmxlQ29sdW1ucyIsInNsaWNlIiwicGl2b3RJbmRleCIsImZpbmRJbmRleCIsImNvbCIsInBpdm90IiwicGl2b3RDb2x1bW5zIiwiZm9yRWFjaCIsImZvdW5kIiwiZmluZCIsInBpdm90SUQiLCJQaXZvdFBhcmVudENvbHVtbiIsInJlZHVjZSIsInByZXYiLCJjdXJyZW50IiwiUGl2b3RHcm91cEhlYWRlciIsIkhlYWRlciIsInBpdm90Q29sdW1uR3JvdXAiLCJwaXZvdERlZmF1bHRzIiwicGl2b3RlZCIsInNwbGljZSIsInVuc2hpZnQiLCJhbGxDb2x1bW5IZWFkZXJzIiwiYWRkSGVhZGVyIiwibGV2ZWwiLCJjaGlsZExldmVscyIsIk1hdGgiLCJtYXgiLCJsb3dlckxldmVsIiwicHJlY2VkaW5nQ29sdW1uIiwibGFzdCIsImluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsIiwiaW5kZXhBZnRlckxhc3RDaGlsZEluUHJlY2VkaW5nQ29sdW1uIiwib3JwaGFucyIsInZpc2libGVDb2x1bW5zIiwic2hpZnQiLCJoZWFkZXJHcm91cHMiLCJyZXZlcnNlIiwiYWNjZXNzUm93IiwiaSIsInJlc29sdmVkRGF0YSIsImFnZ3JlZ2F0aW5nQ29sdW1ucyIsImFnZ3JlZ2F0ZSIsImFnZ3JlZ2F0aW9uVmFsdWVzIiwidmFsdWVzIiwicm93cyIsImdyb3VwUmVjdXJzaXZlbHkiLCJrZXlzIiwiZ3JvdXBlZFJvd3MiLCJPYmplY3QiLCJlbnRyaWVzIiwiZ3JvdXBCeSIsImtleSIsInZhbHVlIiwic3ViUm93cyIsInJvd0dyb3VwIiwibWFudWFsIiwic29ydGVkIiwiZmlsdGVyZWQiLCJkZWZhdWx0RmlsdGVyTWV0aG9kIiwic29ydE1ldGhvZHNCeUNvbHVtbklEIiwic29ydE1ldGhvZCIsInNvcnRlZERhdGEiLCJzb3J0RGF0YSIsImZpbHRlckRhdGEiLCJjdXJyZW50U3RhdGUiLCJnZXRSZXNvbHZlZFN0YXRlIiwicGFnZSIsImdldFN0YXRlT3JQcm9wIiwicGFnZVNpemUiLCJvbkZldGNoRGF0YSIsImZpbHRlcmVkRGF0YSIsImZpbHRlcmVkU29GYXIiLCJuZXh0RmlsdGVyIiwieCIsImZpbHRlcmFibGUiLCJmaWx0ZXJNZXRob2QiLCJmaWx0ZXJBbGwiLCJvcmRlckJ5TWV0aG9kIiwib3JkZXJCeSIsInNvcnQiLCJhIiwiYiIsImRlc2MiLCJkZWZhdWx0U29ydE1ldGhvZCIsIm1pblJvd3MiLCJvblBhZ2VDaGFuZ2UiLCJjb2xsYXBzZU9uUGFnZUNoYW5nZSIsImV4cGFuZGVkIiwic2V0U3RhdGVXaXRoRGF0YSIsIm5ld1BhZ2VTaXplIiwib25QYWdlU2l6ZUNoYW5nZSIsImN1cnJlbnRSb3ciLCJuZXdQYWdlIiwiZmxvb3IiLCJhZGRpdGl2ZSIsInNraXBOZXh0U29ydCIsImRlZmF1bHRTb3J0RGVzYyIsImZpcnN0U29ydERpcmVjdGlvbiIsInByb3RvdHlwZSIsImhhc093blByb3BlcnR5IiwiY2FsbCIsInNlY29uZFNvcnREaXJlY3Rpb24iLCJvblNvcnRlZENoYW5nZSIsIm5ld1NvcnRlZCIsImNsb25lIiwiaXNTb3J0aW5nRGVzYyIsImlzQXJyYXkiLCJleGlzdGluZ0luZGV4IiwiZXhpc3RpbmciLCJjb25jYXQiLCJvbkZpbHRlcmVkQ2hhbmdlIiwibmV3RmlsdGVyaW5nIiwiZXZlbnQiLCJpc1RvdWNoIiwic3RvcFByb3BhZ2F0aW9uIiwicGFyZW50V2lkdGgiLCJ0YXJnZXQiLCJwYXJlbnRFbGVtZW50IiwiZ2V0Qm91bmRpbmdDbGllbnRSZWN0Iiwid2lkdGgiLCJwYWdlWCIsImNoYW5nZWRUb3VjaGVzIiwidHJhcEV2ZW50cyIsImN1cnJlbnRseVJlc2l6aW5nIiwic3RhcnRYIiwiZG9jdW1lbnQiLCJhZGRFdmVudExpc3RlbmVyIiwicmVzaXplQ29sdW1uTW92aW5nIiwicmVzaXplQ29sdW1uRW5kIiwib25SZXNpemVkQ2hhbmdlIiwicmVzaXplZCIsImN1cnJlbnRDb2x1bW4iLCJjIiwibWluUmVzaXplV2lkdGgiLCJuZXdSZXNpemVkIiwidHlwZSIsIm5ld1dpZHRoIiwicmVtb3ZlRXZlbnRMaXN0ZW5lciIsIkJhc2UiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUFBOzs7O0FBQ0E7Ozs7Ozs7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dEIsT0FBSixFQUFhO0FBQ1hZLG1CQUFTWSxtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLVixrQkFBL0M7QUFDQUYsbUJBQVNZLG1CQUFULENBQTZCLGFBQTdCLEVBQTRDLEtBQUtULGVBQWpEO0FBQ0FILG1CQUFTWSxtQkFBVCxDQUE2QixVQUE3QixFQUF5QyxLQUFLVCxlQUE5QztBQUNEOztBQUVEO0FBQ0E7QUFDQUgsaUJBQVNZLG1CQUFULENBQTZCLFdBQTdCLEVBQTBDLEtBQUtWLGtCQUEvQztBQUNBRixpQkFBU1ksbUJBQVQsQ0FBNkIsU0FBN0IsRUFBd0MsS0FBS1QsZUFBN0M7QUFDQUgsaUJBQVNZLG1CQUFULENBQTZCLFlBQTdCLEVBQTJDLEtBQUtULGVBQWhEOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFlBQUksQ0FBQ2YsT0FBTCxFQUFjO0FBQ1osZUFBS3pCLGdCQUFMLENBQXNCO0FBQ3BCTywwQkFBYyxJQURNO0FBRXBCNEIsK0JBQW1CO0FBRkMsV0FBdEI7QUFJRDtBQUNGO0FBL3FCVTs7QUFBQTtBQUFBLElBQ0NlLElBREQ7QUFBQSxDIiwiZmlsZSI6Im1ldGhvZHMuanMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUmVhY3QgZnJvbSAncmVhY3QnXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuXG5leHBvcnQgZGVmYXVsdCBCYXNlID0+XG4gIGNsYXNzIGV4dGVuZHMgQmFzZSB7XG4gICAgZ2V0UmVzb2x2ZWRTdGF0ZSAocHJvcHMsIHN0YXRlKSB7XG4gICAgICBjb25zdCByZXNvbHZlZFN0YXRlID0ge1xuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QodGhpcy5zdGF0ZSksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdCh0aGlzLnByb3BzKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHN0YXRlKSxcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHByb3BzKSxcbiAgICAgIH1cbiAgICAgIHJldHVybiByZXNvbHZlZFN0YXRlXG4gICAgfVxuXG4gICAgZ2V0RGF0YU1vZGVsIChuZXdTdGF0ZSwgZGF0YUNoYW5nZWQpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgY29sdW1ucyxcbiAgICAgICAgcGl2b3RCeSA9IFtdLFxuICAgICAgICBkYXRhLFxuICAgICAgICByZXNvbHZlRGF0YSxcbiAgICAgICAgcGl2b3RJREtleSxcbiAgICAgICAgcGl2b3RWYWxLZXksXG4gICAgICAgIHN1YlJvd3NLZXksXG4gICAgICAgIGFnZ3JlZ2F0ZWRLZXksXG4gICAgICAgIG5lc3RpbmdMZXZlbEtleSxcbiAgICAgICAgb3JpZ2luYWxLZXksXG4gICAgICAgIGluZGV4S2V5LFxuICAgICAgICBncm91cGVkQnlQaXZvdEtleSxcbiAgICAgICAgU3ViQ29tcG9uZW50LFxuICAgICAgfSA9IG5ld1N0YXRlXG5cbiAgICAgIC8vIERldGVybWluZSBpZiB0aGVyZSBhcmUgSGVhZGVyIEdyb3Vwc1xuICAgICAgY29uc3QgaGFzSGVhZGVyR3JvdXBzID0gY29sdW1ucy5zb21lKGNvbHVtbiA9PiBjb2x1bW4uY29sdW1ucylcblxuICAgICAgLy8gRmluZCB0aGUgZXhwYW5kZXIgY29sdW1uIHdoaWNoIGNvdWxkIGJlIGRlZXAgaW4gdHJlZSBvZiBjb2x1bW5zXG4gICAgICBjb25zdCBhbGxDb2x1bW5zID0gXy5pdGVyVHJlZShjb2x1bW5zLCAnY29sdW1ucycpXG4gICAgICBjb25zdCBleHBhbmRlckNvbHVtbiA9IF8uZ2V0Rmlyc3REZWZpbmVkKGFsbENvbHVtbnMpXG5cbiAgICAgIC8vIElmIHdlIGhhdmUgU3ViQ29tcG9uZW50J3Mgd2UgbmVlZCB0byBtYWtlIHN1cmUgd2UgaGF2ZSBhbiBleHBhbmRlciBjb2x1bW5cbiAgICAgIGNvbnN0IGhhc1N1YkNvbXBvbmVudEFuZE5vRXhwYW5kZXJDb2x1bW4gPSBTdWJDb21wb25lbnQgJiYgIWV4cGFuZGVyQ29sdW1uXG4gICAgICBjb25zdCBjb2x1bW5zV2l0aEV4cGFuZGVyID0gaGFzU3ViQ29tcG9uZW50QW5kTm9FeHBhbmRlckNvbHVtblxuICAgICAgICA/IFt7IGV4cGFuZGVyOiB0cnVlIH0sIC4uLmNvbHVtbnNdXG4gICAgICAgIDogWy4uLmNvbHVtbnNdXG5cbiAgICAgIGNvbnN0IG1ha2VEZWNvcmF0ZWRDb2x1bW4gPSAoY29sdW1uLCBwYXJlbnRDb2x1bW4pID0+IHtcbiAgICAgICAgbGV0IGRjb2xcbiAgICAgICAgaWYgKGNvbHVtbi5leHBhbmRlcikge1xuICAgICAgICAgIGRjb2wgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuZXhwYW5kZXJEZWZhdWx0cyxcbiAgICAgICAgICAgIC4uLmNvbHVtbixcbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgZGNvbCA9IHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gRW5zdXJlIG1pbldpZHRoIGlzIG5vdCBncmVhdGVyIHRoYW4gbWF4V2lkdGggaWYgc2V0XG4gICAgICAgIGlmIChkY29sLm1heFdpZHRoIDwgZGNvbC5taW5XaWR0aCkge1xuICAgICAgICAgIGRjb2wubWluV2lkdGggPSBkY29sLm1heFdpZHRoXG4gICAgICAgIH1cblxuICAgICAgICBpZiAocGFyZW50Q29sdW1uKSB7XG4gICAgICAgICAgZGNvbC5wYXJlbnRDb2x1bW4gPSBwYXJlbnRDb2x1bW5cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZpcnN0IGNoZWNrIGZvciBzdHJpbmcgYWNjZXNzb3JcbiAgICAgICAgaWYgKHR5cGVvZiBkY29sLmFjY2Vzc29yID09PSAnc3RyaW5nJykge1xuICAgICAgICAgIGRjb2wuaWQgPSBkY29sLmlkIHx8IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBjb25zdCBhY2Nlc3NvclN0cmluZyA9IGRjb2wuYWNjZXNzb3JcbiAgICAgICAgICBkY29sLmFjY2Vzc29yID0gcm93ID0+IF8uZ2V0KHJvdywgYWNjZXNzb3JTdHJpbmcpXG4gICAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBmdW5jdGlvbmFsIGFjY2Vzc29yIChidXQgcmVxdWlyZSBhbiBJRClcbiAgICAgICAgaWYgKGRjb2wuYWNjZXNzb3IgJiYgIWRjb2wuaWQpIHtcbiAgICAgICAgICBjb25zb2xlLndhcm4oZGNvbClcbiAgICAgICAgICB0aHJvdyBuZXcgRXJyb3IoXG4gICAgICAgICAgICAnQSBjb2x1bW4gaWQgaXMgcmVxdWlyZWQgaWYgdXNpbmcgYSBub24tc3RyaW5nIGFjY2Vzc29yIGZvciBjb2x1bW4gYWJvdmUuJ1xuICAgICAgICAgIClcbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEZhbGwgYmFjayB0byBhbiB1bmRlZmluZWQgYWNjZXNzb3JcbiAgICAgICAgaWYgKCFkY29sLmFjY2Vzc29yKSB7XG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9ICgpID0+IHVuZGVmaW5lZFxuICAgICAgICB9XG5cbiAgICAgICAgcmV0dXJuIGRjb2xcbiAgICAgIH1cblxuICAgICAgY29uc3QgYWxsRGVjb3JhdGVkQ29sdW1ucyA9IFtdXG5cbiAgICAgIC8vIERlY29yYXRlIHRoZSBjb2x1bW5zXG4gICAgICBjb25zdCBkZWNvcmF0ZUFuZEFkZFRvQWxsID0gKGNvbHVtbnMsIHBhcmVudENvbHVtbikgPT4gY29sdW1ucy5tYXAoY29sdW1uID0+IHtcbiAgICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1uID0gbWFrZURlY29yYXRlZENvbHVtbihjb2x1bW4sIHBhcmVudENvbHVtbilcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgZGVjb3JhdGVkQ29sdW1uLmNvbHVtbnMgPSBkZWNvcmF0ZUFuZEFkZFRvQWxsKGNvbHVtbi5jb2x1bW5zLCBjb2x1bW4pXG4gICAgICAgIH1cblxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLnB1c2goZGVjb3JhdGVkQ29sdW1uKVxuICAgICAgICByZXR1cm4gZGVjb3JhdGVkQ29sdW1uXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBkZWNvcmF0ZWRDb2x1bW5zID0gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW5zV2l0aEV4cGFuZGVyKVxuICAgICAgY29uc3QgbWFwVmlzaWJsZUNvbHVtbnMgPSBjb2x1bW5zID0+IGNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGNvbnN0IHZpc2libGVTdWJDb2x1bW5zID0gY29sdW1uLmNvbHVtbnMuZmlsdGVyKFxuICAgICAgICAgICAgZCA9PiAocGl2b3RCeS5pbmRleE9mKGQuaWQpID4gLTEgPyBmYWxzZSA6IF8uZ2V0Rmlyc3REZWZpbmVkKGQuc2hvdywgdHJ1ZSkpXG4gICAgICAgICAgKVxuICAgICAgICAgIHJldHVybiB7XG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgICBjb2x1bW5zOiBtYXBWaXNpYmxlQ29sdW1ucyh2aXNpYmxlU3ViQ29sdW1ucyksXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiBjb2x1bW5cbiAgICAgIH0pXG5cbiAgICAgIGNvbnN0IGZpbHRlclZpc2libGVDb2x1bW5zID0gY29sdW1ucyA9PiBjb2x1bW5zLmZpbHRlcihcbiAgICAgICAgY29sdW1uID0+XG4gICAgICAgICAgY29sdW1uLmNvbHVtbnNcbiAgICAgICAgICAgID8gY29sdW1uLmNvbHVtbnMubGVuZ3RoXG4gICAgICAgICAgICA6IHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gLTFcbiAgICAgICAgICAgICAgPyBmYWxzZVxuICAgICAgICAgICAgICA6IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5zaG93LCB0cnVlKVxuICAgICAgKVxuXG4gICAgICAvLyBCdWlsZCB0aGUgZnVsbCBhcnJheSBvZiB2aXNpYmxlIGNvbHVtbnMgLSB0aGlzIGlzIGFuIGFycmF5IHRoYXQgY29udGFpbnMgYWxsIGNvbHVtbnMgdGhhdFxuICAgICAgLy8gYXJlIG5vdCBoaWRkZW4gdmlhIHBpdm90aW5nXG4gICAgICBjb25zdCBhbGxWaXNpYmxlQ29sdW1ucyA9IGZpbHRlclZpc2libGVDb2x1bW5zKG1hcFZpc2libGVDb2x1bW5zKGRlY29yYXRlZENvbHVtbnMuc2xpY2UoKSkpXG5cbiAgICAgIC8vIEZpbmQgYW55IGN1c3RvbSBwaXZvdCBsb2NhdGlvblxuICAgICAgY29uc3QgcGl2b3RJbmRleCA9IGFsbFZpc2libGVDb2x1bW5zLmZpbmRJbmRleChjb2wgPT4gY29sLnBpdm90KVxuXG4gICAgICAvLyBIYW5kbGUgUGl2b3QgQ29sdW1uc1xuICAgICAgaWYgKHBpdm90QnkubGVuZ3RoKSB7XG4gICAgICAgIC8vIFJldHJpZXZlIHRoZSBwaXZvdCBjb2x1bW5zIGluIHRoZSBjb3JyZWN0IHBpdm90IG9yZGVyXG4gICAgICAgIGNvbnN0IHBpdm90Q29sdW1ucyA9IFtdXG4gICAgICAgIHBpdm90QnkuZm9yRWFjaChwaXZvdElEID0+IHtcbiAgICAgICAgICBjb25zdCBmb3VuZCA9IGFsbERlY29yYXRlZENvbHVtbnMuZmluZChkID0+IGQuaWQgPT09IHBpdm90SUQpXG4gICAgICAgICAgaWYgKGZvdW5kKSB7XG4gICAgICAgICAgICBwaXZvdENvbHVtbnMucHVzaChmb3VuZClcbiAgICAgICAgICB9XG4gICAgICAgIH0pXG5cbiAgICAgICAgY29uc3QgUGl2b3RQYXJlbnRDb2x1bW4gPSBwaXZvdENvbHVtbnMucmVkdWNlKFxuICAgICAgICAgIChwcmV2LCBjdXJyZW50KSA9PiBwcmV2ICYmIHByZXYgPT09IGN1cnJlbnQucGFyZW50Q29sdW1uICYmIGN1cnJlbnQucGFyZW50Q29sdW1uLFxuICAgICAgICAgIHBpdm90Q29sdW1uc1swXS5wYXJlbnRDb2x1bW5cbiAgICAgICAgKVxuXG4gICAgICAgIGxldCBQaXZvdEdyb3VwSGVhZGVyID0gaGFzSGVhZGVyR3JvdXBzICYmIFBpdm90UGFyZW50Q29sdW1uLkhlYWRlclxuICAgICAgICBQaXZvdEdyb3VwSGVhZGVyID0gUGl2b3RHcm91cEhlYWRlciB8fCAoKCkgPT4gPHN0cm9uZz5QaXZvdGVkPC9zdHJvbmc+KVxuXG4gICAgICAgIGxldCBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgIEhlYWRlcjogUGl2b3RHcm91cEhlYWRlcixcbiAgICAgICAgICBjb2x1bW5zOiBwaXZvdENvbHVtbnMubWFwKGNvbCA9PiAoe1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5waXZvdERlZmF1bHRzLFxuICAgICAgICAgICAgLi4uY29sLFxuICAgICAgICAgICAgcGl2b3RlZDogdHJ1ZSxcbiAgICAgICAgICB9KSksXG4gICAgICAgIH1cblxuICAgICAgICAvLyBQbGFjZSB0aGUgcGl2b3RDb2x1bW5zIGJhY2sgaW50byB0aGUgdmlzaWJsZUNvbHVtbnNcbiAgICAgICAgaWYgKHBpdm90SW5kZXggPj0gMCkge1xuICAgICAgICAgIHBpdm90Q29sdW1uR3JvdXAgPSB7XG4gICAgICAgICAgICAuLi5hbGxWaXNpYmxlQ29sdW1uc1twaXZvdEluZGV4XSxcbiAgICAgICAgICAgIC4uLnBpdm90Q29sdW1uR3JvdXAsXG4gICAgICAgICAgfVxuICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnNwbGljZShwaXZvdEluZGV4LCAxLCBwaXZvdENvbHVtbkdyb3VwKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGFsbFZpc2libGVDb2x1bW5zLnVuc2hpZnQocGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICAvLyBCdWlsZCBWaXNpYmxlIENvbHVtbnMgYW5kIEhlYWRlciBHcm91cHNcbiAgICAgIGNvbnN0IGFsbENvbHVtbkhlYWRlcnMgPSBbXVxuXG4gICAgICBjb25zdCBhZGRIZWFkZXIgPSBjb2x1bW4gPT4ge1xuICAgICAgICBsZXQgbGV2ZWwgPSAwXG5cbiAgICAgICAgLy8gSWYgdGhpcyBjb2x1bW4gaGFzIGNoaWxkcmVuLCBwdXNoIHRoZW0gZmlyc3QgYW5kIGFkZCB0aGlzIGNvbHVtbiB0byB0aGUgbmV4dCBsZXZlbFxuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCBjaGlsZExldmVscyA9IGNvbHVtbi5jb2x1bW5zLm1hcChhZGRIZWFkZXIpXG4gICAgICAgICAgbGV2ZWwgPSBNYXRoLm1heCguLi5jaGlsZExldmVscykgKyAxXG4gICAgICAgIH1cblxuICAgICAgICAvLyBBZGQgc3BhbnMgYWJvdmUgY29sdW1ucyB3aXRob3V0IHBhcmVudHMgKG9ycGhhbnMpIHRvIGZpbGwgdGhlIHNwYWNlIGFib3ZlIHRoZW1cbiAgICAgICAgaWYgKGFsbENvbHVtbkhlYWRlcnMubGVuZ3RoIDw9IGxldmVsKSBhbGxDb2x1bW5IZWFkZXJzLnB1c2goW10pXG4gICAgICAgIGlmIChsZXZlbCA+IDApIHtcbiAgICAgICAgICAvLyBUaGUgc3BhbnMgbmVlZCB0byBjb250YWluIHRoZSBzaGlmdGVkIGhlYWRlcnMgYXMgY2hpbGRyZW4uIFRoaXMgZmluZHMgYWxsIG9mIHRoZVxuICAgICAgICAgIC8vIGNvbHVtbnMgaW4gdGhlIGxvd2VyIGxldmVsIGJldHdlZW4gdGhlIGZpcnN0IGNoaWxkIG9mIHRoaXMgY29sdW1uIGFuZCB0aGUgbGFzdCBjaGlsZFxuICAgICAgICAgIC8vIG9mIHRoZSBwcmVjZWRpbmcgY29sdW1uIChpZiB0aGVyZSBpcyBvbmUpXG4gICAgICAgICAgY29uc3QgbG93ZXJMZXZlbCA9IGFsbENvbHVtbkhlYWRlcnNbbGV2ZWwgLSAxXVxuICAgICAgICAgIGNvbnN0IHByZWNlZGluZ0NvbHVtbiA9IF8ubGFzdChhbGxDb2x1bW5IZWFkZXJzW2xldmVsXSlcblxuICAgICAgICAgIGNvbnN0IGluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsID0gbG93ZXJMZXZlbC5pbmRleE9mKGNvbHVtbi5jb2x1bW5zWzBdKVxuICAgICAgICAgIGNvbnN0IGluZGV4QWZ0ZXJMYXN0Q2hpbGRJblByZWNlZGluZ0NvbHVtbiA9IHByZWNlZGluZ0NvbHVtblxuICAgICAgICAgICAgPyBsb3dlckxldmVsLmluZGV4T2YoXy5sYXN0KHByZWNlZGluZ0NvbHVtbi5jb2x1bW5zKSkgKyAxXG4gICAgICAgICAgICA6IDBcblxuICAgICAgICAgIC8vIElmIHRoZXJlIGFyZSBvcGhhbnMsIGFkZCBhIHNwYW4gYWJvdmUgdGhlbVxuICAgICAgICAgIGNvbnN0IG9ycGhhbnMgPSBsb3dlckxldmVsLnNsaWNlKFxuICAgICAgICAgICAgaW5kZXhBZnRlckxhc3RDaGlsZEluUHJlY2VkaW5nQ29sdW1uLFxuICAgICAgICAgICAgaW5kZXhPZkZpcnN0Q2hpbGRJbkxvd2VyTGV2ZWxcbiAgICAgICAgICApXG5cbiAgICAgICAgICBpZiAob3JwaGFucy5sZW5ndGgpIHtcbiAgICAgICAgICAgIGFsbENvbHVtbkhlYWRlcnNbbGV2ZWxdLnB1c2goe1xuICAgICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgICAgY29sdW1uczogb3JwaGFucyxcbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgYWxsQ29sdW1uSGVhZGVyc1tsZXZlbF0ucHVzaChjb2x1bW4pXG5cbiAgICAgICAgcmV0dXJuIGxldmVsXG4gICAgICB9XG5cbiAgICAgIGFsbFZpc2libGVDb2x1bW5zLmZvckVhY2goYWRkSGVhZGVyKVxuXG4gICAgICAvLyB2aXNpYmxlQ29sdW1ucyBpcyBhbiBhcnJheSBjb250YWluaW5nIGNvbHVtbiBkZWZpbml0aW9ucyBmb3IgdGhlIGJvdHRvbSByb3cgb2YgVEggZWxlbWVudHNcbiAgICAgIGNvbnN0IHZpc2libGVDb2x1bW5zID0gYWxsQ29sdW1uSGVhZGVycy5zaGlmdCgpXG4gICAgICBjb25zdCBoZWFkZXJHcm91cHMgPSBhbGxDb2x1bW5IZWFkZXJzLnJldmVyc2UoKVxuXG4gICAgICAvLyBBY2Nlc3MgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFjY2Vzc1JvdyA9IChkLCBpLCBsZXZlbCA9IDApID0+IHtcbiAgICAgICAgY29uc3Qgcm93ID0ge1xuICAgICAgICAgIFtvcmlnaW5hbEtleV06IGQsXG4gICAgICAgICAgW2luZGV4S2V5XTogaSxcbiAgICAgICAgICBbc3ViUm93c0tleV06IGRbc3ViUm93c0tleV0sXG4gICAgICAgICAgW25lc3RpbmdMZXZlbEtleV06IGxldmVsLFxuICAgICAgICB9XG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHJldHVyblxuICAgICAgICAgIHJvd1tjb2x1bW4uaWRdID0gY29sdW1uLmFjY2Vzc29yKGQpXG4gICAgICAgIH0pXG4gICAgICAgIGlmIChyb3dbc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByb3dbc3ViUm93c0tleV0gPSByb3dbc3ViUm93c0tleV0ubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSwgbGV2ZWwgKyAxKSlcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gcm93XG4gICAgICB9XG5cbiAgICAgIC8vIC8vIElmIHRoZSBkYXRhIGhhc24ndCBjaGFuZ2VkLCBqdXN0IHVzZSB0aGUgY2FjaGVkIGRhdGFcbiAgICAgIGxldCByZXNvbHZlZERhdGEgPSB0aGlzLnJlc29sdmVkRGF0YVxuICAgICAgLy8gSWYgdGhlIGRhdGEgaGFzIGNoYW5nZWQsIHJ1biB0aGUgZGF0YSByZXNvbHZlciBhbmQgY2FjaGUgdGhlIHJlc3VsdFxuICAgICAgaWYgKCF0aGlzLnJlc29sdmVkRGF0YSB8fCBkYXRhQ2hhbmdlZCkge1xuICAgICAgICByZXNvbHZlZERhdGEgPSByZXNvbHZlRGF0YShkYXRhKVxuICAgICAgICB0aGlzLnJlc29sdmVkRGF0YSA9IHJlc29sdmVkRGF0YVxuICAgICAgfVxuICAgICAgLy8gVXNlIHRoZSByZXNvbHZlZCBkYXRhXG4gICAgICByZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGEubWFwKChkLCBpKSA9PiBhY2Nlc3NSb3coZCwgaSkpXG5cbiAgICAgIC8vIFRPRE86IE1ha2UgaXQgcG9zc2libGUgdG8gZmFicmljYXRlIG5lc3RlZCByb3dzIHdpdGhvdXQgcGl2b3RpbmdcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0aW5nQ29sdW1ucyA9IHZpc2libGVDb2x1bW5zLmZpbHRlcihkID0+ICFkLmV4cGFuZGVyICYmIGQuYWdncmVnYXRlKVxuXG4gICAgICAvLyBJZiBwaXZvdGluZywgcmVjdXJzaXZlbHkgZ3JvdXAgdGhlIGRhdGFcbiAgICAgIGNvbnN0IGFnZ3JlZ2F0ZSA9IHJvd3MgPT4ge1xuICAgICAgICBjb25zdCBhZ2dyZWdhdGlvblZhbHVlcyA9IHt9XG4gICAgICAgIGFnZ3JlZ2F0aW5nQ29sdW1ucy5mb3JFYWNoKGNvbHVtbiA9PiB7XG4gICAgICAgICAgY29uc3QgdmFsdWVzID0gcm93cy5tYXAoZCA9PiBkW2NvbHVtbi5pZF0pXG4gICAgICAgICAgYWdncmVnYXRpb25WYWx1ZXNbY29sdW1uLmlkXSA9IGNvbHVtbi5hZ2dyZWdhdGUodmFsdWVzLCByb3dzKVxuICAgICAgICB9KVxuICAgICAgICByZXR1cm4gYWdncmVnYXRpb25WYWx1ZXNcbiAgICAgIH1cbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICBjb25zdCBncm91cFJlY3Vyc2l2ZWx5ID0gKHJvd3MsIGtleXMsIGkgPSAwKSA9PiB7XG4gICAgICAgICAgLy8gVGhpcyBpcyB0aGUgbGFzdCBsZXZlbCwganVzdCByZXR1cm4gdGhlIHJvd3NcbiAgICAgICAgICBpZiAoaSA9PT0ga2V5cy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiByb3dzXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIEdyb3VwIHRoZSByb3dzIHRvZ2V0aGVyIGZvciB0aGlzIGxldmVsXG4gICAgICAgICAgbGV0IGdyb3VwZWRSb3dzID0gT2JqZWN0LmVudHJpZXMoXy5ncm91cEJ5KHJvd3MsIGtleXNbaV0pKS5tYXAoKFtrZXksIHZhbHVlXSkgPT4gKHtcbiAgICAgICAgICAgIFtwaXZvdElES2V5XToga2V5c1tpXSxcbiAgICAgICAgICAgIFtwaXZvdFZhbEtleV06IGtleSxcbiAgICAgICAgICAgIFtrZXlzW2ldXToga2V5LFxuICAgICAgICAgICAgW3N1YlJvd3NLZXldOiB2YWx1ZSxcbiAgICAgICAgICAgIFtuZXN0aW5nTGV2ZWxLZXldOiBpLFxuICAgICAgICAgICAgW2dyb3VwZWRCeVBpdm90S2V5XTogdHJ1ZSxcbiAgICAgICAgICB9KSlcbiAgICAgICAgICAvLyBSZWN1cnNlIGludG8gdGhlIHN1YlJvd3NcbiAgICAgICAgICBncm91cGVkUm93cyA9IGdyb3VwZWRSb3dzLm1hcChyb3dHcm91cCA9PiB7XG4gICAgICAgICAgICBjb25zdCBzdWJSb3dzID0gZ3JvdXBSZWN1cnNpdmVseShyb3dHcm91cFtzdWJSb3dzS2V5XSwga2V5cywgaSArIDEpXG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3dHcm91cCxcbiAgICAgICAgICAgICAgW3N1YlJvd3NLZXldOiBzdWJSb3dzLFxuICAgICAgICAgICAgICBbYWdncmVnYXRlZEtleV06IHRydWUsXG4gICAgICAgICAgICAgIC4uLmFnZ3JlZ2F0ZShzdWJSb3dzKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIHJldHVybiBncm91cGVkUm93c1xuICAgICAgICB9XG4gICAgICAgIHJlc29sdmVkRGF0YSA9IGdyb3VwUmVjdXJzaXZlbHkocmVzb2x2ZWREYXRhLCBwaXZvdEJ5KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICAuLi5uZXdTdGF0ZSxcbiAgICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgICB2aXNpYmxlQ29sdW1ucyxcbiAgICAgICAgaGVhZGVyR3JvdXBzLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICB9XG4gICAgfVxuXG4gICAgZ2V0U29ydGVkRGF0YSAocmVzb2x2ZWRTdGF0ZSkge1xuICAgICAgY29uc3Qge1xuICAgICAgICBtYW51YWwsXG4gICAgICAgIHNvcnRlZCxcbiAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgdmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGFsbERlY29yYXRlZENvbHVtbnMsXG4gICAgICB9ID0gcmVzb2x2ZWRTdGF0ZVxuXG4gICAgICBjb25zdCBzb3J0TWV0aG9kc0J5Q29sdW1uSUQgPSB7fVxuXG4gICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbHRlcihjb2wgPT4gY29sLnNvcnRNZXRob2QpLmZvckVhY2goY29sID0+IHtcbiAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEW2NvbC5pZF0gPSBjb2wuc29ydE1ldGhvZFxuICAgICAgfSlcblxuICAgICAgLy8gUmVzb2x2ZSB0aGUgZGF0YSBmcm9tIGVpdGhlciBtYW51YWwgZGF0YSBvciBzb3J0ZWQgZGF0YVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgc29ydGVkRGF0YTogbWFudWFsXG4gICAgICAgICAgPyByZXNvbHZlZERhdGFcbiAgICAgICAgICA6IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgICB0aGlzLmZpbHRlckRhdGEocmVzb2x2ZWREYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgYWxsRGVjb3JhdGVkQ29sdW1ucyksXG4gICAgICAgICAgICBzb3J0ZWQsXG4gICAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcbiAgICAgICAgICApLFxuICAgICAgfVxuICAgIH1cblxuICAgIGZpcmVGZXRjaERhdGEgKCkge1xuICAgICAgLy8gZGV0ZXJtaW5lIHRoZSBjdXJyZW50IHN0YXRlLCBwcmVmZXJyaW5nIGNlcnRhaW4gc3RhdGUgdmFsdWVzIG92ZXIgcHJvcHNcbiAgICAgIGNvbnN0IGN1cnJlbnRTdGF0ZSA9IHtcbiAgICAgICAgLi4udGhpcy5nZXRSZXNvbHZlZFN0YXRlKCksXG4gICAgICAgIHBhZ2U6IHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2UnKSxcbiAgICAgICAgcGFnZVNpemU6IHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJyksXG4gICAgICAgIGZpbHRlcjogdGhpcy5nZXRTdGF0ZU9yUHJvcCgnZmlsdGVyJyksXG4gICAgICB9O1xuXG4gICAgICB0aGlzLnByb3BzLm9uRmV0Y2hEYXRhKGN1cnJlbnRTdGF0ZSwgdGhpcylcbiAgICB9XG5cbiAgICBnZXRQcm9wT3JTdGF0ZSAoa2V5KSB7XG4gICAgICByZXR1cm4gXy5nZXRGaXJzdERlZmluZWQodGhpcy5wcm9wc1trZXldLCB0aGlzLnN0YXRlW2tleV0pXG4gICAgfVxuXG4gICAgZ2V0U3RhdGVPclByb3AgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMuc3RhdGVba2V5XSwgdGhpcy5wcm9wc1trZXldKVxuICAgIH1cblxuICAgIGZpbHRlckRhdGEgKGRhdGEsIGZpbHRlcmVkLCBkZWZhdWx0RmlsdGVyTWV0aG9kLCB2aXNpYmxlQ29sdW1ucykge1xuICAgICAgbGV0IGZpbHRlcmVkRGF0YSA9IGRhdGFcblxuICAgICAgaWYgKGZpbHRlcmVkLmxlbmd0aCkge1xuICAgICAgICBmaWx0ZXJlZERhdGEgPSBmaWx0ZXJlZC5yZWR1Y2UoKGZpbHRlcmVkU29GYXIsIG5leHRGaWx0ZXIpID0+IHtcbiAgICAgICAgICBjb25zdCBjb2x1bW4gPSB2aXNpYmxlQ29sdW1ucy5maW5kKHggPT4geC5pZCA9PT0gbmV4dEZpbHRlci5pZClcblxuICAgICAgICAgIC8vIERvbid0IGZpbHRlciBoaWRkZW4gY29sdW1ucyBvciBjb2x1bW5zIHRoYXQgaGF2ZSBoYWQgdGhlaXIgZmlsdGVycyBkaXNhYmxlZFxuICAgICAgICAgIGlmICghY29sdW1uIHx8IGNvbHVtbi5maWx0ZXJhYmxlID09PSBmYWxzZSkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXJcbiAgICAgICAgICB9XG5cbiAgICAgICAgICBjb25zdCBmaWx0ZXJNZXRob2QgPSBjb2x1bW4uZmlsdGVyTWV0aG9kIHx8IGRlZmF1bHRGaWx0ZXJNZXRob2RcblxuICAgICAgICAgIC8vIElmICdmaWx0ZXJBbGwnIGlzIHNldCB0byB0cnVlLCBwYXNzIHRoZSBlbnRpcmUgZGF0YXNldCB0byB0aGUgZmlsdGVyIG1ldGhvZFxuICAgICAgICAgIGlmIChjb2x1bW4uZmlsdGVyQWxsKSB7XG4gICAgICAgICAgICByZXR1cm4gZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIGZpbHRlcmVkU29GYXIsIGNvbHVtbilcbiAgICAgICAgICB9XG4gICAgICAgICAgcmV0dXJuIGZpbHRlcmVkU29GYXIuZmlsdGVyKHJvdyA9PiBmaWx0ZXJNZXRob2QobmV4dEZpbHRlciwgcm93LCBjb2x1bW4pKVxuICAgICAgICB9LCBmaWx0ZXJlZERhdGEpXG5cbiAgICAgICAgLy8gQXBwbHkgdGhlIGZpbHRlciB0byB0aGUgc3Vicm93cyBpZiB3ZSBhcmUgcGl2b3RpbmcsIGFuZCB0aGVuXG4gICAgICAgIC8vIGZpbHRlciBhbnkgcm93cyB3aXRob3V0IHN1YmNvbHVtbnMgYmVjYXVzZSBpdCB3b3VsZCBiZSBzdHJhbmdlIHRvIHNob3dcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWREYXRhXG4gICAgICAgICAgLm1hcChyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gcm93XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgICAuLi5yb3csXG4gICAgICAgICAgICAgIFt0aGlzLnByb3BzLnN1YlJvd3NLZXldOiB0aGlzLmZpbHRlckRhdGEoXG4gICAgICAgICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgICAgICAgZmlsdGVyZWQsXG4gICAgICAgICAgICAgICAgZGVmYXVsdEZpbHRlck1ldGhvZCxcbiAgICAgICAgICAgICAgICB2aXNpYmxlQ29sdW1uc1xuICAgICAgICAgICAgICApLFxuICAgICAgICAgICAgfVxuICAgICAgICAgIH0pXG4gICAgICAgICAgLmZpbHRlcihyb3cgPT4ge1xuICAgICAgICAgICAgaWYgKCFyb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSkge1xuICAgICAgICAgICAgICByZXR1cm4gdHJ1ZVxuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLmxlbmd0aCA+IDBcbiAgICAgICAgICB9KVxuICAgICAgfVxuXG4gICAgICByZXR1cm4gZmlsdGVyZWREYXRhXG4gICAgfVxuXG4gICAgc29ydERhdGEgKGRhdGEsIHNvcnRlZCwgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge30pIHtcbiAgICAgIGlmICghc29ydGVkLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZGF0YVxuICAgICAgfVxuXG4gICAgICBjb25zdCBzb3J0ZWREYXRhID0gKHRoaXMucHJvcHMub3JkZXJCeU1ldGhvZCB8fCBfLm9yZGVyQnkpKFxuICAgICAgICBkYXRhLFxuICAgICAgICBzb3J0ZWQubWFwKHNvcnQgPT4ge1xuICAgICAgICAgIC8vIFN1cHBvcnQgY3VzdG9tIHNvcnRpbmcgbWV0aG9kcyBmb3IgZWFjaCBjb2x1bW5cbiAgICAgICAgICBpZiAoc29ydE1ldGhvZHNCeUNvbHVtbklEW3NvcnQuaWRdKSB7XG4gICAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXShhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiAoYSwgYikgPT4gdGhpcy5wcm9wcy5kZWZhdWx0U29ydE1ldGhvZChhW3NvcnQuaWRdLCBiW3NvcnQuaWRdLCBzb3J0LmRlc2MpXG4gICAgICAgIH0pLFxuICAgICAgICBzb3J0ZWQubWFwKGQgPT4gIWQuZGVzYyksXG4gICAgICAgIHRoaXMucHJvcHMuaW5kZXhLZXlcbiAgICAgIClcblxuICAgICAgc29ydGVkRGF0YS5mb3JFYWNoKHJvdyA9PiB7XG4gICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICByZXR1cm5cbiAgICAgICAgfVxuICAgICAgICByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XSA9IHRoaXMuc29ydERhdGEoXG4gICAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0sXG4gICAgICAgICAgc29ydGVkLFxuICAgICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFxuICAgICAgICApXG4gICAgICB9KVxuXG4gICAgICByZXR1cm4gc29ydGVkRGF0YVxuICAgIH1cblxuICAgIGdldE1pblJvd3MgKCkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHMubWluUm93cywgdGhpcy5nZXRTdGF0ZU9yUHJvcCgncGFnZVNpemUnKSlcbiAgICB9XG5cbiAgICAvLyBVc2VyIGFjdGlvbnNcbiAgICBvblBhZ2VDaGFuZ2UgKHBhZ2UpIHtcbiAgICAgIGNvbnN0IHsgb25QYWdlQ2hhbmdlLCBjb2xsYXBzZU9uUGFnZUNoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBjb25zdCBuZXdTdGF0ZSA9IHsgcGFnZSB9XG4gICAgICBpZiAoY29sbGFwc2VPblBhZ2VDaGFuZ2UpIHtcbiAgICAgICAgbmV3U3RhdGUuZXhwYW5kZWQgPSB7fVxuICAgICAgfVxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKG5ld1N0YXRlLCAoKSA9PiBvblBhZ2VDaGFuZ2UgJiYgb25QYWdlQ2hhbmdlKHBhZ2UpKVxuICAgIH1cblxuICAgIG9uUGFnZVNpemVDaGFuZ2UgKG5ld1BhZ2VTaXplKSB7XG4gICAgICBjb25zdCB7IG9uUGFnZVNpemVDaGFuZ2UgfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgcGFnZVNpemUsIHBhZ2UgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG5cbiAgICAgIC8vIE5vcm1hbGl6ZSB0aGUgcGFnZSB0byBkaXNwbGF5XG4gICAgICBjb25zdCBjdXJyZW50Um93ID0gcGFnZVNpemUgKiBwYWdlXG4gICAgICBjb25zdCBuZXdQYWdlID0gTWF0aC5mbG9vcihjdXJyZW50Um93IC8gbmV3UGFnZVNpemUpXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2VTaXplOiBuZXdQYWdlU2l6ZSxcbiAgICAgICAgICBwYWdlOiBuZXdQYWdlLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvblBhZ2VTaXplQ2hhbmdlICYmIG9uUGFnZVNpemVDaGFuZ2UobmV3UGFnZVNpemUsIG5ld1BhZ2UpXG4gICAgICApXG4gICAgfVxuXG4gICAgc29ydENvbHVtbiAoY29sdW1uLCBhZGRpdGl2ZSkge1xuICAgICAgY29uc3QgeyBzb3J0ZWQsIHNraXBOZXh0U29ydCwgZGVmYXVsdFNvcnREZXNjIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICBjb25zdCBmaXJzdFNvcnREaXJlY3Rpb24gPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwoY29sdW1uLCAnZGVmYXVsdFNvcnREZXNjJylcbiAgICAgICAgPyBjb2x1bW4uZGVmYXVsdFNvcnREZXNjXG4gICAgICAgIDogZGVmYXVsdFNvcnREZXNjXG4gICAgICBjb25zdCBzZWNvbmRTb3J0RGlyZWN0aW9uID0gIWZpcnN0U29ydERpcmVjdGlvblxuXG4gICAgICAvLyB3ZSBjYW4ndCBzdG9wIGV2ZW50IHByb3BhZ2F0aW9uIGZyb20gdGhlIGNvbHVtbiByZXNpemUgbW92ZSBoYW5kbGVyc1xuICAgICAgLy8gYXR0YWNoZWQgdG8gdGhlIGRvY3VtZW50IGJlY2F1c2Ugb2YgcmVhY3QncyBzeW50aGV0aWMgZXZlbnRzXG4gICAgICAvLyBzbyB3ZSBoYXZlIHRvIHByZXZlbnQgdGhlIHNvcnQgZnVuY3Rpb24gZnJvbSBhY3R1YWxseSBzb3J0aW5nXG4gICAgICAvLyBpZiB3ZSBjbGljayBvbiB0aGUgY29sdW1uIHJlc2l6ZSBlbGVtZW50IHdpdGhpbiBhIGhlYWRlci5cbiAgICAgIGlmIChza2lwTmV4dFNvcnQpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgICByZXR1cm5cbiAgICAgIH1cblxuICAgICAgY29uc3QgeyBvblNvcnRlZENoYW5nZSB9ID0gdGhpcy5wcm9wc1xuXG4gICAgICBsZXQgbmV3U29ydGVkID0gXy5jbG9uZShzb3J0ZWQgfHwgW10pLm1hcChkID0+IHtcbiAgICAgICAgZC5kZXNjID0gXy5pc1NvcnRpbmdEZXNjKGQpXG4gICAgICAgIHJldHVybiBkXG4gICAgICB9KVxuICAgICAgaWYgKCFfLmlzQXJyYXkoY29sdW1uKSkge1xuICAgICAgICAvLyBTaW5nbGUtU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgICAgaWYgKGV4aXN0aW5nSW5kZXggPiAtMSkge1xuICAgICAgICAgIGNvbnN0IGV4aXN0aW5nID0gbmV3U29ydGVkW2V4aXN0aW5nSW5kZXhdXG4gICAgICAgICAgaWYgKGV4aXN0aW5nLmRlc2MgPT09IHNlY29uZFNvcnREaXJlY3Rpb24pIHtcbiAgICAgICAgICAgIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgICAgICBuZXdTb3J0ZWQuc3BsaWNlKGV4aXN0aW5nSW5kZXgsIDEpXG4gICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICBleGlzdGluZy5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkID0gW2V4aXN0aW5nXVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZC5wdXNoKHtcbiAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBbXG4gICAgICAgICAgICB7XG4gICAgICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0sXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBNdWx0aS1Tb3J0XG4gICAgICAgIGNvbnN0IGV4aXN0aW5nSW5kZXggPSBuZXdTb3J0ZWQuZmluZEluZGV4KGQgPT4gZC5pZCA9PT0gY29sdW1uWzBdLmlkKVxuICAgICAgICAvLyBFeGlzdGluZyBTb3J0ZWQgQ29sdW1uXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgICBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleCArIGldLmRlc2MgPSBmaXJzdFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgICAgfSlcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY29sdW1uLmZvckVhY2goKGQsIGkpID0+IHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gc2Vjb25kU29ydERpcmVjdGlvblxuICAgICAgICAgICAgfSlcbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKCFhZGRpdGl2ZSkge1xuICAgICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLnNsaWNlKGV4aXN0aW5nSW5kZXgsIGNvbHVtbi5sZW5ndGgpXG4gICAgICAgICAgfVxuICAgICAgICAgIC8vIE5ldyBTb3J0IENvbHVtblxuICAgICAgICB9IGVsc2UgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gbmV3U29ydGVkLmNvbmNhdChcbiAgICAgICAgICAgIGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgICBpZDogZC5pZCxcbiAgICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgICAgfSkpXG4gICAgICAgICAgKVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IGNvbHVtbi5tYXAoZCA9PiAoe1xuICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgfSkpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgcGFnZTogKCFzb3J0ZWQubGVuZ3RoICYmIG5ld1NvcnRlZC5sZW5ndGgpIHx8ICFhZGRpdGl2ZSA/IDAgOiB0aGlzLnN0YXRlLnBhZ2UsXG4gICAgICAgICAgc29ydGVkOiBuZXdTb3J0ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uU29ydGVkQ2hhbmdlICYmIG9uU29ydGVkQ2hhbmdlKG5ld1NvcnRlZCwgY29sdW1uLCBhZGRpdGl2ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICBmaWx0ZXJDb2x1bW4gKGNvbHVtbiwgdmFsdWUpIHtcbiAgICAgIGNvbnN0IHsgZmlsdGVyZWQgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCB7IG9uRmlsdGVyZWRDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgLy8gUmVtb3ZlIG9sZCBmaWx0ZXIgZmlyc3QgaWYgaXQgZXhpc3RzXG4gICAgICBjb25zdCBuZXdGaWx0ZXJpbmcgPSAoZmlsdGVyZWQgfHwgW10pLmZpbHRlcih4ID0+IHguaWQgIT09IGNvbHVtbi5pZClcblxuICAgICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgICBuZXdGaWx0ZXJpbmcucHVzaCh7XG4gICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICB2YWx1ZSxcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKFxuICAgICAgICB7XG4gICAgICAgICAgZmlsdGVyZWQ6IG5ld0ZpbHRlcmluZyxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25GaWx0ZXJlZENoYW5nZSAmJiBvbkZpbHRlcmVkQ2hhbmdlKG5ld0ZpbHRlcmluZywgY29sdW1uLCB2YWx1ZSlcbiAgICAgIClcbiAgICB9XG5cbiAgICByZXNpemVDb2x1bW5TdGFydCAoZXZlbnQsIGNvbHVtbiwgaXNUb3VjaCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHBhcmVudFdpZHRoID0gZXZlbnQudGFyZ2V0LnBhcmVudEVsZW1lbnQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCkud2lkdGhcblxuICAgICAgbGV0IHBhZ2VYXG4gICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LnBhZ2VYXG4gICAgICB9XG5cbiAgICAgIHRoaXMudHJhcEV2ZW50cyA9IHRydWVcbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiB7XG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgc3RhcnRYOiBwYWdlWCxcbiAgICAgICAgICAgIHBhcmVudFdpZHRoLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IHtcbiAgICAgICAgICBpZiAoaXNUb3VjaCkge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hlbmQnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgICBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uTW92aW5nIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IHsgb25SZXNpemVkQ2hhbmdlLCBjb2x1bW4gfSA9IHRoaXMucHJvcHNcbiAgICAgIGNvbnN0IHsgcmVzaXplZCwgY3VycmVudGx5UmVzaXppbmcsIGNvbHVtbnMgfSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgICBjb25zdCBjdXJyZW50Q29sdW1uID0gY29sdW1ucy5maW5kKGMgPT4gYy5hY2Nlc3NvciA9PT0gY3VycmVudGx5UmVzaXppbmcuaWQpXG4gICAgICBjb25zdCBtaW5SZXNpemVXaWR0aCA9IGN1cnJlbnRDb2x1bW4gPyBjdXJyZW50Q29sdW1uLm1pblJlc2l6ZVdpZHRoIDogY29sdW1uLm1pblJlc2l6ZVdpZHRoXG5cbiAgICAgIC8vIERlbGV0ZSBvbGQgdmFsdWVcbiAgICAgIGNvbnN0IG5ld1Jlc2l6ZWQgPSByZXNpemVkLmZpbHRlcih4ID0+IHguaWQgIT09IGN1cnJlbnRseVJlc2l6aW5nLmlkKVxuXG4gICAgICBsZXQgcGFnZVhcblxuICAgICAgaWYgKGV2ZW50LnR5cGUgPT09ICd0b3VjaG1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQuY2hhbmdlZFRvdWNoZXNbMF0ucGFnZVhcbiAgICAgIH0gZWxzZSBpZiAoZXZlbnQudHlwZSA9PT0gJ21vdXNlbW92ZScpIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5wYWdlWFxuICAgICAgfVxuXG4gICAgICBjb25zdCBuZXdXaWR0aCA9IE1hdGgubWF4KFxuICAgICAgICBjdXJyZW50bHlSZXNpemluZy5wYXJlbnRXaWR0aCArIHBhZ2VYIC0gY3VycmVudGx5UmVzaXppbmcuc3RhcnRYLFxuICAgICAgICBtaW5SZXNpemVXaWR0aFxuICAgICAgKVxuXG4gICAgICBuZXdSZXNpemVkLnB1c2goe1xuICAgICAgICBpZDogY3VycmVudGx5UmVzaXppbmcuaWQsXG4gICAgICAgIHZhbHVlOiBuZXdXaWR0aCxcbiAgICAgIH0pXG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHJlc2l6ZWQ6IG5ld1Jlc2l6ZWQsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uUmVzaXplZENoYW5nZSAmJiBvblJlc2l6ZWRDaGFuZ2UobmV3UmVzaXplZCwgZXZlbnQpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uRW5kIChldmVudCkge1xuICAgICAgZXZlbnQuc3RvcFByb3BhZ2F0aW9uKClcbiAgICAgIGNvbnN0IGlzVG91Y2ggPSBldmVudC50eXBlID09PSAndG91Y2hlbmQnIHx8IGV2ZW50LnR5cGUgPT09ICd0b3VjaGNhbmNlbCdcblxuICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcigndG91Y2htb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoY2FuY2VsJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICB9XG5cbiAgICAgIC8vIElmIGl0cyBhIHRvdWNoIGV2ZW50IGNsZWFyIHRoZSBtb3VzZSBvbmUncyBhcyB3ZWxsIGJlY2F1c2Ugc29tZXRpbWVzXG4gICAgICAvLyB0aGUgbW91c2VEb3duIGV2ZW50IGdldHMgY2FsbGVkIGFzIHdlbGwsIGJ1dCB0aGUgbW91c2VVcCBldmVudCBkb2Vzbid0XG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZW1vdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbk1vdmluZylcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNldXAnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ21vdXNlbGVhdmUnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcblxuICAgICAgLy8gVGhlIHRvdWNoIGV2ZW50cyBkb24ndCBwcm9wYWdhdGUgdXAgdG8gdGhlIHNvcnRpbmcncyBvbk1vdXNlRG93biBldmVudCBzb1xuICAgICAgLy8gbm8gbmVlZCB0byBwcmV2ZW50IGl0IGZyb20gaGFwcGVuaW5nIG9yIGVsc2UgdGhlIGZpcnN0IGNsaWNrIGFmdGVyIGEgdG91Y2hcbiAgICAgIC8vIGV2ZW50IHJlc2l6ZSB3aWxsIG5vdCBzb3J0IHRoZSBjb2x1bW4uXG4gICAgICBpZiAoIWlzVG91Y2gpIHtcbiAgICAgICAgdGhpcy5zZXRTdGF0ZVdpdGhEYXRhKHtcbiAgICAgICAgICBza2lwTmV4dFNvcnQ6IHRydWUsXG4gICAgICAgICAgY3VycmVudGx5UmVzaXppbmc6IGZhbHNlLFxuICAgICAgICB9KVxuICAgICAgfVxuICAgIH1cbiAgfVxuIl19