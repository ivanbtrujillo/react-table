var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React from 'react';
import _ from './utils';

export default (function (Base) {
  return function (_Base) {
    _inherits(_class, _Base);

    function _class() {
      _classCallCheck(this, _class);

      return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
    }

    _createClass(_class, [{
      key: 'getResolvedState',
      value: function getResolvedState(props, state) {
        var resolvedState = _extends({}, _.compactObject(this.state), _.compactObject(this.props), _.compactObject(state), _.compactObject(props));
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
        var allColumns = _.iterTree(columns, 'columns');
        var expanderColumn = _.getFirstDefined(allColumns);

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
              return _.get(row, accessorString);
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
                return pivotBy.indexOf(d.id) > -1 ? false : _.getFirstDefined(d.show, true);
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
            return column.columns ? column.columns.length : pivotBy.indexOf(column.id) > -1 ? false : _.getFirstDefined(column.show, true);
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
            return React.createElement(
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
            var precedingColumn = _.last(allColumnHeaders[level]);

            var indexOfFirstChildInLowerLevel = lowerLevel.indexOf(column.columns[0]);
            var indexAfterLastChildInPrecedingColumn = precedingColumn ? lowerLevel.indexOf(_.last(precedingColumn.columns)) + 1 : 0;

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
            var groupedRows = Object.entries(_.groupBy(rows, keys[i])).map(function (_ref) {
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
        return _.getFirstDefined(this.props[key], this.state[key]);
      }
    }, {
      key: 'getStateOrProp',
      value: function getStateOrProp(key) {
        return _.getFirstDefined(this.state[key], this.props[key]);
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

        var sortedData = (this.props.orderByMethod || _.orderBy)(data, sorted.map(function (sort) {
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
        return _.getFirstDefined(this.props.minRows, this.getStateOrProp('pageSize'));
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


        var newSorted = _.clone(sorted || []).map(function (d) {
          d.desc = _.isSortingDesc(d);
          return d;
        });
        if (!_.isArray(column)) {
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9tZXRob2RzLmpzIl0sIm5hbWVzIjpbIlJlYWN0IiwiXyIsInByb3BzIiwic3RhdGUiLCJyZXNvbHZlZFN0YXRlIiwiY29tcGFjdE9iamVjdCIsIm5ld1N0YXRlIiwiZGF0YUNoYW5nZWQiLCJjb2x1bW5zIiwicGl2b3RCeSIsImRhdGEiLCJyZXNvbHZlRGF0YSIsInBpdm90SURLZXkiLCJwaXZvdFZhbEtleSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5IiwibmVzdGluZ0xldmVsS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5IiwiU3ViQ29tcG9uZW50IiwiaGFzSGVhZGVyR3JvdXBzIiwic29tZSIsImNvbHVtbiIsImFsbENvbHVtbnMiLCJpdGVyVHJlZSIsImV4cGFuZGVyQ29sdW1uIiwiZ2V0Rmlyc3REZWZpbmVkIiwiaGFzU3ViQ29tcG9uZW50QW5kTm9FeHBhbmRlckNvbHVtbiIsImNvbHVtbnNXaXRoRXhwYW5kZXIiLCJleHBhbmRlciIsIm1ha2VEZWNvcmF0ZWRDb2x1bW4iLCJwYXJlbnRDb2x1bW4iLCJkY29sIiwiZXhwYW5kZXJEZWZhdWx0cyIsIm1heFdpZHRoIiwibWluV2lkdGgiLCJhY2Nlc3NvciIsImlkIiwiYWNjZXNzb3JTdHJpbmciLCJnZXQiLCJyb3ciLCJjb25zb2xlIiwid2FybiIsIkVycm9yIiwidW5kZWZpbmVkIiwiYWxsRGVjb3JhdGVkQ29sdW1ucyIsImRlY29yYXRlQW5kQWRkVG9BbGwiLCJtYXAiLCJkZWNvcmF0ZWRDb2x1bW4iLCJwdXNoIiwiZGVjb3JhdGVkQ29sdW1ucyIsIm1hcFZpc2libGVDb2x1bW5zIiwidmlzaWJsZVN1YkNvbHVtbnMiLCJmaWx0ZXIiLCJpbmRleE9mIiwiZCIsInNob3ciLCJmaWx0ZXJWaXNpYmxlQ29sdW1ucyIsImxlbmd0aCIsImFsbFZpc2libGVDb2x1bW5zIiwic2xpY2UiLCJwaXZvdEluZGV4IiwiZmluZEluZGV4IiwiY29sIiwicGl2b3QiLCJwaXZvdENvbHVtbnMiLCJmb3JFYWNoIiwiZm91bmQiLCJmaW5kIiwicGl2b3RJRCIsIlBpdm90UGFyZW50Q29sdW1uIiwicmVkdWNlIiwicHJldiIsImN1cnJlbnQiLCJQaXZvdEdyb3VwSGVhZGVyIiwiSGVhZGVyIiwicGl2b3RDb2x1bW5Hcm91cCIsInBpdm90RGVmYXVsdHMiLCJwaXZvdGVkIiwic3BsaWNlIiwidW5zaGlmdCIsImFsbENvbHVtbkhlYWRlcnMiLCJhZGRIZWFkZXIiLCJsZXZlbCIsImNoaWxkTGV2ZWxzIiwiTWF0aCIsIm1heCIsImxvd2VyTGV2ZWwiLCJwcmVjZWRpbmdDb2x1bW4iLCJsYXN0IiwiaW5kZXhPZkZpcnN0Q2hpbGRJbkxvd2VyTGV2ZWwiLCJpbmRleEFmdGVyTGFzdENoaWxkSW5QcmVjZWRpbmdDb2x1bW4iLCJvcnBoYW5zIiwidmlzaWJsZUNvbHVtbnMiLCJzaGlmdCIsImhlYWRlckdyb3VwcyIsInJldmVyc2UiLCJhY2Nlc3NSb3ciLCJpIiwicmVzb2x2ZWREYXRhIiwiYWdncmVnYXRpbmdDb2x1bW5zIiwiYWdncmVnYXRlIiwiYWdncmVnYXRpb25WYWx1ZXMiLCJ2YWx1ZXMiLCJyb3dzIiwiZ3JvdXBSZWN1cnNpdmVseSIsImtleXMiLCJncm91cGVkUm93cyIsIk9iamVjdCIsImVudHJpZXMiLCJncm91cEJ5Iiwia2V5IiwidmFsdWUiLCJzdWJSb3dzIiwicm93R3JvdXAiLCJtYW51YWwiLCJzb3J0ZWQiLCJmaWx0ZXJlZCIsImRlZmF1bHRGaWx0ZXJNZXRob2QiLCJzb3J0TWV0aG9kc0J5Q29sdW1uSUQiLCJzb3J0TWV0aG9kIiwic29ydGVkRGF0YSIsInNvcnREYXRhIiwiZmlsdGVyRGF0YSIsImN1cnJlbnRTdGF0ZSIsImdldFJlc29sdmVkU3RhdGUiLCJwYWdlIiwiZ2V0U3RhdGVPclByb3AiLCJwYWdlU2l6ZSIsIm9uRmV0Y2hEYXRhIiwiZmlsdGVyZWREYXRhIiwiZmlsdGVyZWRTb0ZhciIsIm5leHRGaWx0ZXIiLCJ4IiwiZmlsdGVyYWJsZSIsImZpbHRlck1ldGhvZCIsImZpbHRlckFsbCIsIm9yZGVyQnlNZXRob2QiLCJvcmRlckJ5Iiwic29ydCIsImEiLCJiIiwiZGVzYyIsImRlZmF1bHRTb3J0TWV0aG9kIiwibWluUm93cyIsIm9uUGFnZUNoYW5nZSIsImNvbGxhcHNlT25QYWdlQ2hhbmdlIiwiZXhwYW5kZWQiLCJzZXRTdGF0ZVdpdGhEYXRhIiwibmV3UGFnZVNpemUiLCJvblBhZ2VTaXplQ2hhbmdlIiwiY3VycmVudFJvdyIsIm5ld1BhZ2UiLCJmbG9vciIsImFkZGl0aXZlIiwic2tpcE5leHRTb3J0IiwiZGVmYXVsdFNvcnREZXNjIiwiZmlyc3RTb3J0RGlyZWN0aW9uIiwicHJvdG90eXBlIiwiaGFzT3duUHJvcGVydHkiLCJjYWxsIiwic2Vjb25kU29ydERpcmVjdGlvbiIsIm9uU29ydGVkQ2hhbmdlIiwibmV3U29ydGVkIiwiY2xvbmUiLCJpc1NvcnRpbmdEZXNjIiwiaXNBcnJheSIsImV4aXN0aW5nSW5kZXgiLCJleGlzdGluZyIsImNvbmNhdCIsIm9uRmlsdGVyZWRDaGFuZ2UiLCJuZXdGaWx0ZXJpbmciLCJldmVudCIsImlzVG91Y2giLCJzdG9wUHJvcGFnYXRpb24iLCJwYXJlbnRXaWR0aCIsInRhcmdldCIsInBhcmVudEVsZW1lbnQiLCJnZXRCb3VuZGluZ0NsaWVudFJlY3QiLCJ3aWR0aCIsInBhZ2VYIiwiY2hhbmdlZFRvdWNoZXMiLCJ0cmFwRXZlbnRzIiwiY3VycmVudGx5UmVzaXppbmciLCJzdGFydFgiLCJkb2N1bWVudCIsImFkZEV2ZW50TGlzdGVuZXIiLCJyZXNpemVDb2x1bW5Nb3ZpbmciLCJyZXNpemVDb2x1bW5FbmQiLCJvblJlc2l6ZWRDaGFuZ2UiLCJyZXNpemVkIiwiY3VycmVudENvbHVtbiIsImMiLCJtaW5SZXNpemVXaWR0aCIsIm5ld1Jlc2l6ZWQiLCJ0eXBlIiwibmV3V2lkdGgiLCJyZW1vdmVFdmVudExpc3RlbmVyIiwiQmFzZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQUFBLE9B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QUFOLEtBQWUsYUFBNUQ7O0FBRUEsWUFBSXRCLE9BQUosRUFBYTtBQUNYWSxtQkFBU1ksbUJBQVQsQ0FBNkIsV0FBN0IsRUFBMEMsS0FBS1Ysa0JBQS9DO0FBQ0FGLG1CQUFTWSxtQkFBVCxDQUE2QixhQUE3QixFQUE0QyxLQUFLVCxlQUFqRDtBQUNBSCxtQkFBU1ksbUJBQVQsQ0FBNkIsVUFBN0IsRUFBeUMsS0FBS1QsZUFBOUM7QUFDRDs7QUFFRDtBQUNBO0FBQ0FILGlCQUFTWSxtQkFBVCxDQUE2QixXQUE3QixFQUEwQyxLQUFLVixrQkFBL0M7QUFDQUYsaUJBQVNZLG1CQUFULENBQTZCLFNBQTdCLEVBQXdDLEtBQUtULGVBQTdDO0FBQ0FILGlCQUFTWSxtQkFBVCxDQUE2QixZQUE3QixFQUEyQyxLQUFLVCxlQUFoRDs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxZQUFJLENBQUNmLE9BQUwsRUFBYztBQUNaLGVBQUt6QixnQkFBTCxDQUFzQjtBQUNwQk8sMEJBQWMsSUFETTtBQUVwQjRCLCtCQUFtQjtBQUZDLFdBQXRCO0FBSUQ7QUFDRjtBQS9xQlU7O0FBQUE7QUFBQSxJQUNDZSxJQUREO0FBQUEsQ0FBZiIsImZpbGUiOiJtZXRob2RzLmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0IGZyb20gJ3JlYWN0J1xuaW1wb3J0IF8gZnJvbSAnLi91dGlscydcblxuZXhwb3J0IGRlZmF1bHQgQmFzZSA9PlxuICBjbGFzcyBleHRlbmRzIEJhc2Uge1xuICAgIGdldFJlc29sdmVkU3RhdGUgKHByb3BzLCBzdGF0ZSkge1xuICAgICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHtcbiAgICAgICAgLi4uXy5jb21wYWN0T2JqZWN0KHRoaXMuc3RhdGUpLFxuICAgICAgICAuLi5fLmNvbXBhY3RPYmplY3QodGhpcy5wcm9wcyksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdChzdGF0ZSksXG4gICAgICAgIC4uLl8uY29tcGFjdE9iamVjdChwcm9wcyksXG4gICAgICB9XG4gICAgICByZXR1cm4gcmVzb2x2ZWRTdGF0ZVxuICAgIH1cblxuICAgIGdldERhdGFNb2RlbCAobmV3U3RhdGUsIGRhdGFDaGFuZ2VkKSB7XG4gICAgICBjb25zdCB7XG4gICAgICAgIGNvbHVtbnMsXG4gICAgICAgIHBpdm90QnkgPSBbXSxcbiAgICAgICAgZGF0YSxcbiAgICAgICAgcmVzb2x2ZURhdGEsXG4gICAgICAgIHBpdm90SURLZXksXG4gICAgICAgIHBpdm90VmFsS2V5LFxuICAgICAgICBzdWJSb3dzS2V5LFxuICAgICAgICBhZ2dyZWdhdGVkS2V5LFxuICAgICAgICBuZXN0aW5nTGV2ZWxLZXksXG4gICAgICAgIG9yaWdpbmFsS2V5LFxuICAgICAgICBpbmRleEtleSxcbiAgICAgICAgZ3JvdXBlZEJ5UGl2b3RLZXksXG4gICAgICAgIFN1YkNvbXBvbmVudCxcbiAgICAgIH0gPSBuZXdTdGF0ZVxuXG4gICAgICAvLyBEZXRlcm1pbmUgaWYgdGhlcmUgYXJlIEhlYWRlciBHcm91cHNcbiAgICAgIGNvbnN0IGhhc0hlYWRlckdyb3VwcyA9IGNvbHVtbnMuc29tZShjb2x1bW4gPT4gY29sdW1uLmNvbHVtbnMpXG5cbiAgICAgIC8vIEZpbmQgdGhlIGV4cGFuZGVyIGNvbHVtbiB3aGljaCBjb3VsZCBiZSBkZWVwIGluIHRyZWUgb2YgY29sdW1uc1xuICAgICAgY29uc3QgYWxsQ29sdW1ucyA9IF8uaXRlclRyZWUoY29sdW1ucywgJ2NvbHVtbnMnKVxuICAgICAgY29uc3QgZXhwYW5kZXJDb2x1bW4gPSBfLmdldEZpcnN0RGVmaW5lZChhbGxDb2x1bW5zKVxuXG4gICAgICAvLyBJZiB3ZSBoYXZlIFN1YkNvbXBvbmVudCdzIHdlIG5lZWQgdG8gbWFrZSBzdXJlIHdlIGhhdmUgYW4gZXhwYW5kZXIgY29sdW1uXG4gICAgICBjb25zdCBoYXNTdWJDb21wb25lbnRBbmROb0V4cGFuZGVyQ29sdW1uID0gU3ViQ29tcG9uZW50ICYmICFleHBhbmRlckNvbHVtblxuICAgICAgY29uc3QgY29sdW1uc1dpdGhFeHBhbmRlciA9IGhhc1N1YkNvbXBvbmVudEFuZE5vRXhwYW5kZXJDb2x1bW5cbiAgICAgICAgPyBbeyBleHBhbmRlcjogdHJ1ZSB9LCAuLi5jb2x1bW5zXVxuICAgICAgICA6IFsuLi5jb2x1bW5zXVxuXG4gICAgICBjb25zdCBtYWtlRGVjb3JhdGVkQ29sdW1uID0gKGNvbHVtbiwgcGFyZW50Q29sdW1uKSA9PiB7XG4gICAgICAgIGxldCBkY29sXG4gICAgICAgIGlmIChjb2x1bW4uZXhwYW5kZXIpIHtcbiAgICAgICAgICBkY29sID0ge1xuICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmV4cGFuZGVyRGVmYXVsdHMsXG4gICAgICAgICAgICAuLi5jb2x1bW4sXG4gICAgICAgICAgfVxuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIGRjb2wgPSB7XG4gICAgICAgICAgICAuLi50aGlzLnByb3BzLmNvbHVtbixcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMuY29sdW1uLFxuICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIC8vIEVuc3VyZSBtaW5XaWR0aCBpcyBub3QgZ3JlYXRlciB0aGFuIG1heFdpZHRoIGlmIHNldFxuICAgICAgICBpZiAoZGNvbC5tYXhXaWR0aCA8IGRjb2wubWluV2lkdGgpIHtcbiAgICAgICAgICBkY29sLm1pbldpZHRoID0gZGNvbC5tYXhXaWR0aFxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHBhcmVudENvbHVtbikge1xuICAgICAgICAgIGRjb2wucGFyZW50Q29sdW1uID0gcGFyZW50Q29sdW1uXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGaXJzdCBjaGVjayBmb3Igc3RyaW5nIGFjY2Vzc29yXG4gICAgICAgIGlmICh0eXBlb2YgZGNvbC5hY2Nlc3NvciA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICBkY29sLmlkID0gZGNvbC5pZCB8fCBkY29sLmFjY2Vzc29yXG4gICAgICAgICAgY29uc3QgYWNjZXNzb3JTdHJpbmcgPSBkY29sLmFjY2Vzc29yXG4gICAgICAgICAgZGNvbC5hY2Nlc3NvciA9IHJvdyA9PiBfLmdldChyb3csIGFjY2Vzc29yU3RyaW5nKVxuICAgICAgICAgIHJldHVybiBkY29sXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gZnVuY3Rpb25hbCBhY2Nlc3NvciAoYnV0IHJlcXVpcmUgYW4gSUQpXG4gICAgICAgIGlmIChkY29sLmFjY2Vzc29yICYmICFkY29sLmlkKSB7XG4gICAgICAgICAgY29uc29sZS53YXJuKGRjb2wpXG4gICAgICAgICAgdGhyb3cgbmV3IEVycm9yKFxuICAgICAgICAgICAgJ0EgY29sdW1uIGlkIGlzIHJlcXVpcmVkIGlmIHVzaW5nIGEgbm9uLXN0cmluZyBhY2Nlc3NvciBmb3IgY29sdW1uIGFib3ZlLidcbiAgICAgICAgICApXG4gICAgICAgIH1cblxuICAgICAgICAvLyBGYWxsIGJhY2sgdG8gYW4gdW5kZWZpbmVkIGFjY2Vzc29yXG4gICAgICAgIGlmICghZGNvbC5hY2Nlc3Nvcikge1xuICAgICAgICAgIGRjb2wuYWNjZXNzb3IgPSAoKSA9PiB1bmRlZmluZWRcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiBkY29sXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGFsbERlY29yYXRlZENvbHVtbnMgPSBbXVxuXG4gICAgICAvLyBEZWNvcmF0ZSB0aGUgY29sdW1uc1xuICAgICAgY29uc3QgZGVjb3JhdGVBbmRBZGRUb0FsbCA9IChjb2x1bW5zLCBwYXJlbnRDb2x1bW4pID0+IGNvbHVtbnMubWFwKGNvbHVtbiA9PiB7XG4gICAgICAgIGNvbnN0IGRlY29yYXRlZENvbHVtbiA9IG1ha2VEZWNvcmF0ZWRDb2x1bW4oY29sdW1uLCBwYXJlbnRDb2x1bW4pXG4gICAgICAgIGlmIChjb2x1bW4uY29sdW1ucykge1xuICAgICAgICAgIGRlY29yYXRlZENvbHVtbi5jb2x1bW5zID0gZGVjb3JhdGVBbmRBZGRUb0FsbChjb2x1bW4uY29sdW1ucywgY29sdW1uKVxuICAgICAgICB9XG5cbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5wdXNoKGRlY29yYXRlZENvbHVtbilcbiAgICAgICAgcmV0dXJuIGRlY29yYXRlZENvbHVtblxuICAgICAgfSlcblxuICAgICAgY29uc3QgZGVjb3JhdGVkQ29sdW1ucyA9IGRlY29yYXRlQW5kQWRkVG9BbGwoY29sdW1uc1dpdGhFeHBhbmRlcilcbiAgICAgIGNvbnN0IG1hcFZpc2libGVDb2x1bW5zID0gY29sdW1ucyA9PiBjb2x1bW5zLm1hcChjb2x1bW4gPT4ge1xuICAgICAgICBpZiAoY29sdW1uLmNvbHVtbnMpIHtcbiAgICAgICAgICBjb25zdCB2aXNpYmxlU3ViQ29sdW1ucyA9IGNvbHVtbi5jb2x1bW5zLmZpbHRlcihcbiAgICAgICAgICAgIGQgPT4gKHBpdm90QnkuaW5kZXhPZihkLmlkKSA+IC0xID8gZmFsc2UgOiBfLmdldEZpcnN0RGVmaW5lZChkLnNob3csIHRydWUpKVxuICAgICAgICAgIClcbiAgICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgLi4uY29sdW1uLFxuICAgICAgICAgICAgY29sdW1uczogbWFwVmlzaWJsZUNvbHVtbnModmlzaWJsZVN1YkNvbHVtbnMpLFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY29sdW1uXG4gICAgICB9KVxuXG4gICAgICBjb25zdCBmaWx0ZXJWaXNpYmxlQ29sdW1ucyA9IGNvbHVtbnMgPT4gY29sdW1ucy5maWx0ZXIoXG4gICAgICAgIGNvbHVtbiA9PlxuICAgICAgICAgIGNvbHVtbi5jb2x1bW5zXG4gICAgICAgICAgICA/IGNvbHVtbi5jb2x1bW5zLmxlbmd0aFxuICAgICAgICAgICAgOiBwaXZvdEJ5LmluZGV4T2YoY29sdW1uLmlkKSA+IC0xXG4gICAgICAgICAgICAgID8gZmFsc2VcbiAgICAgICAgICAgICAgOiBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4uc2hvdywgdHJ1ZSlcbiAgICAgIClcblxuICAgICAgLy8gQnVpbGQgdGhlIGZ1bGwgYXJyYXkgb2YgdmlzaWJsZSBjb2x1bW5zIC0gdGhpcyBpcyBhbiBhcnJheSB0aGF0IGNvbnRhaW5zIGFsbCBjb2x1bW5zIHRoYXRcbiAgICAgIC8vIGFyZSBub3QgaGlkZGVuIHZpYSBwaXZvdGluZ1xuICAgICAgY29uc3QgYWxsVmlzaWJsZUNvbHVtbnMgPSBmaWx0ZXJWaXNpYmxlQ29sdW1ucyhtYXBWaXNpYmxlQ29sdW1ucyhkZWNvcmF0ZWRDb2x1bW5zLnNsaWNlKCkpKVxuXG4gICAgICAvLyBGaW5kIGFueSBjdXN0b20gcGl2b3QgbG9jYXRpb25cbiAgICAgIGNvbnN0IHBpdm90SW5kZXggPSBhbGxWaXNpYmxlQ29sdW1ucy5maW5kSW5kZXgoY29sID0+IGNvbC5waXZvdClcblxuICAgICAgLy8gSGFuZGxlIFBpdm90IENvbHVtbnNcbiAgICAgIGlmIChwaXZvdEJ5Lmxlbmd0aCkge1xuICAgICAgICAvLyBSZXRyaWV2ZSB0aGUgcGl2b3QgY29sdW1ucyBpbiB0aGUgY29ycmVjdCBwaXZvdCBvcmRlclxuICAgICAgICBjb25zdCBwaXZvdENvbHVtbnMgPSBbXVxuICAgICAgICBwaXZvdEJ5LmZvckVhY2gocGl2b3RJRCA9PiB7XG4gICAgICAgICAgY29uc3QgZm91bmQgPSBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZpbmQoZCA9PiBkLmlkID09PSBwaXZvdElEKVxuICAgICAgICAgIGlmIChmb3VuZCkge1xuICAgICAgICAgICAgcGl2b3RDb2x1bW5zLnB1c2goZm91bmQpXG4gICAgICAgICAgfVxuICAgICAgICB9KVxuXG4gICAgICAgIGNvbnN0IFBpdm90UGFyZW50Q29sdW1uID0gcGl2b3RDb2x1bW5zLnJlZHVjZShcbiAgICAgICAgICAocHJldiwgY3VycmVudCkgPT4gcHJldiAmJiBwcmV2ID09PSBjdXJyZW50LnBhcmVudENvbHVtbiAmJiBjdXJyZW50LnBhcmVudENvbHVtbixcbiAgICAgICAgICBwaXZvdENvbHVtbnNbMF0ucGFyZW50Q29sdW1uXG4gICAgICAgIClcblxuICAgICAgICBsZXQgUGl2b3RHcm91cEhlYWRlciA9IGhhc0hlYWRlckdyb3VwcyAmJiBQaXZvdFBhcmVudENvbHVtbi5IZWFkZXJcbiAgICAgICAgUGl2b3RHcm91cEhlYWRlciA9IFBpdm90R3JvdXBIZWFkZXIgfHwgKCgpID0+IDxzdHJvbmc+UGl2b3RlZDwvc3Ryb25nPilcblxuICAgICAgICBsZXQgcGl2b3RDb2x1bW5Hcm91cCA9IHtcbiAgICAgICAgICBIZWFkZXI6IFBpdm90R3JvdXBIZWFkZXIsXG4gICAgICAgICAgY29sdW1uczogcGl2b3RDb2x1bW5zLm1hcChjb2wgPT4gKHtcbiAgICAgICAgICAgIC4uLnRoaXMucHJvcHMucGl2b3REZWZhdWx0cyxcbiAgICAgICAgICAgIC4uLmNvbCxcbiAgICAgICAgICAgIHBpdm90ZWQ6IHRydWUsXG4gICAgICAgICAgfSkpLFxuICAgICAgICB9XG5cbiAgICAgICAgLy8gUGxhY2UgdGhlIHBpdm90Q29sdW1ucyBiYWNrIGludG8gdGhlIHZpc2libGVDb2x1bW5zXG4gICAgICAgIGlmIChwaXZvdEluZGV4ID49IDApIHtcbiAgICAgICAgICBwaXZvdENvbHVtbkdyb3VwID0ge1xuICAgICAgICAgICAgLi4uYWxsVmlzaWJsZUNvbHVtbnNbcGl2b3RJbmRleF0sXG4gICAgICAgICAgICAuLi5waXZvdENvbHVtbkdyb3VwLFxuICAgICAgICAgIH1cbiAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucy5zcGxpY2UocGl2b3RJbmRleCwgMSwgcGl2b3RDb2x1bW5Hcm91cClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBhbGxWaXNpYmxlQ29sdW1ucy51bnNoaWZ0KHBpdm90Q29sdW1uR3JvdXApXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gQnVpbGQgVmlzaWJsZSBDb2x1bW5zIGFuZCBIZWFkZXIgR3JvdXBzXG4gICAgICBjb25zdCBhbGxDb2x1bW5IZWFkZXJzID0gW11cblxuICAgICAgY29uc3QgYWRkSGVhZGVyID0gY29sdW1uID0+IHtcbiAgICAgICAgbGV0IGxldmVsID0gMFxuXG4gICAgICAgIC8vIElmIHRoaXMgY29sdW1uIGhhcyBjaGlsZHJlbiwgcHVzaCB0aGVtIGZpcnN0IGFuZCBhZGQgdGhpcyBjb2x1bW4gdG8gdGhlIG5leHQgbGV2ZWxcbiAgICAgICAgaWYgKGNvbHVtbi5jb2x1bW5zKSB7XG4gICAgICAgICAgY29uc3QgY2hpbGRMZXZlbHMgPSBjb2x1bW4uY29sdW1ucy5tYXAoYWRkSGVhZGVyKVxuICAgICAgICAgIGxldmVsID0gTWF0aC5tYXgoLi4uY2hpbGRMZXZlbHMpICsgMVxuICAgICAgICB9XG5cbiAgICAgICAgLy8gQWRkIHNwYW5zIGFib3ZlIGNvbHVtbnMgd2l0aG91dCBwYXJlbnRzIChvcnBoYW5zKSB0byBmaWxsIHRoZSBzcGFjZSBhYm92ZSB0aGVtXG4gICAgICAgIGlmIChhbGxDb2x1bW5IZWFkZXJzLmxlbmd0aCA8PSBsZXZlbCkgYWxsQ29sdW1uSGVhZGVycy5wdXNoKFtdKVxuICAgICAgICBpZiAobGV2ZWwgPiAwKSB7XG4gICAgICAgICAgLy8gVGhlIHNwYW5zIG5lZWQgdG8gY29udGFpbiB0aGUgc2hpZnRlZCBoZWFkZXJzIGFzIGNoaWxkcmVuLiBUaGlzIGZpbmRzIGFsbCBvZiB0aGVcbiAgICAgICAgICAvLyBjb2x1bW5zIGluIHRoZSBsb3dlciBsZXZlbCBiZXR3ZWVuIHRoZSBmaXJzdCBjaGlsZCBvZiB0aGlzIGNvbHVtbiBhbmQgdGhlIGxhc3QgY2hpbGRcbiAgICAgICAgICAvLyBvZiB0aGUgcHJlY2VkaW5nIGNvbHVtbiAoaWYgdGhlcmUgaXMgb25lKVxuICAgICAgICAgIGNvbnN0IGxvd2VyTGV2ZWwgPSBhbGxDb2x1bW5IZWFkZXJzW2xldmVsIC0gMV1cbiAgICAgICAgICBjb25zdCBwcmVjZWRpbmdDb2x1bW4gPSBfLmxhc3QoYWxsQ29sdW1uSGVhZGVyc1tsZXZlbF0pXG5cbiAgICAgICAgICBjb25zdCBpbmRleE9mRmlyc3RDaGlsZEluTG93ZXJMZXZlbCA9IGxvd2VyTGV2ZWwuaW5kZXhPZihjb2x1bW4uY29sdW1uc1swXSlcbiAgICAgICAgICBjb25zdCBpbmRleEFmdGVyTGFzdENoaWxkSW5QcmVjZWRpbmdDb2x1bW4gPSBwcmVjZWRpbmdDb2x1bW5cbiAgICAgICAgICAgID8gbG93ZXJMZXZlbC5pbmRleE9mKF8ubGFzdChwcmVjZWRpbmdDb2x1bW4uY29sdW1ucykpICsgMVxuICAgICAgICAgICAgOiAwXG5cbiAgICAgICAgICAvLyBJZiB0aGVyZSBhcmUgb3BoYW5zLCBhZGQgYSBzcGFuIGFib3ZlIHRoZW1cbiAgICAgICAgICBjb25zdCBvcnBoYW5zID0gbG93ZXJMZXZlbC5zbGljZShcbiAgICAgICAgICAgIGluZGV4QWZ0ZXJMYXN0Q2hpbGRJblByZWNlZGluZ0NvbHVtbixcbiAgICAgICAgICAgIGluZGV4T2ZGaXJzdENoaWxkSW5Mb3dlckxldmVsXG4gICAgICAgICAgKVxuXG4gICAgICAgICAgaWYgKG9ycGhhbnMubGVuZ3RoKSB7XG4gICAgICAgICAgICBhbGxDb2x1bW5IZWFkZXJzW2xldmVsXS5wdXNoKHtcbiAgICAgICAgICAgICAgLi4udGhpcy5wcm9wcy5jb2x1bW4sXG4gICAgICAgICAgICAgIGNvbHVtbnM6IG9ycGhhbnMsXG4gICAgICAgICAgICB9KVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGFsbENvbHVtbkhlYWRlcnNbbGV2ZWxdLnB1c2goY29sdW1uKVxuXG4gICAgICAgIHJldHVybiBsZXZlbFxuICAgICAgfVxuXG4gICAgICBhbGxWaXNpYmxlQ29sdW1ucy5mb3JFYWNoKGFkZEhlYWRlcilcblxuICAgICAgLy8gdmlzaWJsZUNvbHVtbnMgaXMgYW4gYXJyYXkgY29udGFpbmluZyBjb2x1bW4gZGVmaW5pdGlvbnMgZm9yIHRoZSBib3R0b20gcm93IG9mIFRIIGVsZW1lbnRzXG4gICAgICBjb25zdCB2aXNpYmxlQ29sdW1ucyA9IGFsbENvbHVtbkhlYWRlcnMuc2hpZnQoKVxuICAgICAgY29uc3QgaGVhZGVyR3JvdXBzID0gYWxsQ29sdW1uSGVhZGVycy5yZXZlcnNlKClcblxuICAgICAgLy8gQWNjZXNzIHRoZSBkYXRhXG4gICAgICBjb25zdCBhY2Nlc3NSb3cgPSAoZCwgaSwgbGV2ZWwgPSAwKSA9PiB7XG4gICAgICAgIGNvbnN0IHJvdyA9IHtcbiAgICAgICAgICBbb3JpZ2luYWxLZXldOiBkLFxuICAgICAgICAgIFtpbmRleEtleV06IGksXG4gICAgICAgICAgW3N1YlJvd3NLZXldOiBkW3N1YlJvd3NLZXldLFxuICAgICAgICAgIFtuZXN0aW5nTGV2ZWxLZXldOiBsZXZlbCxcbiAgICAgICAgfVxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLmZvckVhY2goY29sdW1uID0+IHtcbiAgICAgICAgICBpZiAoY29sdW1uLmV4cGFuZGVyKSByZXR1cm5cbiAgICAgICAgICByb3dbY29sdW1uLmlkXSA9IGNvbHVtbi5hY2Nlc3NvcihkKVxuICAgICAgICB9KVxuICAgICAgICBpZiAocm93W3N1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcm93W3N1YlJvd3NLZXldID0gcm93W3N1YlJvd3NLZXldLm1hcCgoZCwgaSkgPT4gYWNjZXNzUm93KGQsIGksIGxldmVsICsgMSkpXG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgfVxuXG4gICAgICAvLyAvLyBJZiB0aGUgZGF0YSBoYXNuJ3QgY2hhbmdlZCwganVzdCB1c2UgdGhlIGNhY2hlZCBkYXRhXG4gICAgICBsZXQgcmVzb2x2ZWREYXRhID0gdGhpcy5yZXNvbHZlZERhdGFcbiAgICAgIC8vIElmIHRoZSBkYXRhIGhhcyBjaGFuZ2VkLCBydW4gdGhlIGRhdGEgcmVzb2x2ZXIgYW5kIGNhY2hlIHRoZSByZXN1bHRcbiAgICAgIGlmICghdGhpcy5yZXNvbHZlZERhdGEgfHwgZGF0YUNoYW5nZWQpIHtcbiAgICAgICAgcmVzb2x2ZWREYXRhID0gcmVzb2x2ZURhdGEoZGF0YSlcbiAgICAgICAgdGhpcy5yZXNvbHZlZERhdGEgPSByZXNvbHZlZERhdGFcbiAgICAgIH1cbiAgICAgIC8vIFVzZSB0aGUgcmVzb2x2ZWQgZGF0YVxuICAgICAgcmVzb2x2ZWREYXRhID0gcmVzb2x2ZWREYXRhLm1hcCgoZCwgaSkgPT4gYWNjZXNzUm93KGQsIGkpKVxuXG4gICAgICAvLyBUT0RPOiBNYWtlIGl0IHBvc3NpYmxlIHRvIGZhYnJpY2F0ZSBuZXN0ZWQgcm93cyB3aXRob3V0IHBpdm90aW5nXG4gICAgICBjb25zdCBhZ2dyZWdhdGluZ0NvbHVtbnMgPSB2aXNpYmxlQ29sdW1ucy5maWx0ZXIoZCA9PiAhZC5leHBhbmRlciAmJiBkLmFnZ3JlZ2F0ZSlcblxuICAgICAgLy8gSWYgcGl2b3RpbmcsIHJlY3Vyc2l2ZWx5IGdyb3VwIHRoZSBkYXRhXG4gICAgICBjb25zdCBhZ2dyZWdhdGUgPSByb3dzID0+IHtcbiAgICAgICAgY29uc3QgYWdncmVnYXRpb25WYWx1ZXMgPSB7fVxuICAgICAgICBhZ2dyZWdhdGluZ0NvbHVtbnMuZm9yRWFjaChjb2x1bW4gPT4ge1xuICAgICAgICAgIGNvbnN0IHZhbHVlcyA9IHJvd3MubWFwKGQgPT4gZFtjb2x1bW4uaWRdKVxuICAgICAgICAgIGFnZ3JlZ2F0aW9uVmFsdWVzW2NvbHVtbi5pZF0gPSBjb2x1bW4uYWdncmVnYXRlKHZhbHVlcywgcm93cylcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuIGFnZ3JlZ2F0aW9uVmFsdWVzXG4gICAgICB9XG4gICAgICBpZiAocGl2b3RCeS5sZW5ndGgpIHtcbiAgICAgICAgY29uc3QgZ3JvdXBSZWN1cnNpdmVseSA9IChyb3dzLCBrZXlzLCBpID0gMCkgPT4ge1xuICAgICAgICAgIC8vIFRoaXMgaXMgdGhlIGxhc3QgbGV2ZWwsIGp1c3QgcmV0dXJuIHRoZSByb3dzXG4gICAgICAgICAgaWYgKGkgPT09IGtleXMubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gcm93c1xuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBHcm91cCB0aGUgcm93cyB0b2dldGhlciBmb3IgdGhpcyBsZXZlbFxuICAgICAgICAgIGxldCBncm91cGVkUm93cyA9IE9iamVjdC5lbnRyaWVzKF8uZ3JvdXBCeShyb3dzLCBrZXlzW2ldKSkubWFwKChba2V5LCB2YWx1ZV0pID0+ICh7XG4gICAgICAgICAgICBbcGl2b3RJREtleV06IGtleXNbaV0sXG4gICAgICAgICAgICBbcGl2b3RWYWxLZXldOiBrZXksXG4gICAgICAgICAgICBba2V5c1tpXV06IGtleSxcbiAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogdmFsdWUsXG4gICAgICAgICAgICBbbmVzdGluZ0xldmVsS2V5XTogaSxcbiAgICAgICAgICAgIFtncm91cGVkQnlQaXZvdEtleV06IHRydWUsXG4gICAgICAgICAgfSkpXG4gICAgICAgICAgLy8gUmVjdXJzZSBpbnRvIHRoZSBzdWJSb3dzXG4gICAgICAgICAgZ3JvdXBlZFJvd3MgPSBncm91cGVkUm93cy5tYXAocm93R3JvdXAgPT4ge1xuICAgICAgICAgICAgY29uc3Qgc3ViUm93cyA9IGdyb3VwUmVjdXJzaXZlbHkocm93R3JvdXBbc3ViUm93c0tleV0sIGtleXMsIGkgKyAxKVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucm93R3JvdXAsXG4gICAgICAgICAgICAgIFtzdWJSb3dzS2V5XTogc3ViUm93cyxcbiAgICAgICAgICAgICAgW2FnZ3JlZ2F0ZWRLZXldOiB0cnVlLFxuICAgICAgICAgICAgICAuLi5hZ2dyZWdhdGUoc3ViUm93cyksXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSlcbiAgICAgICAgICByZXR1cm4gZ3JvdXBlZFJvd3NcbiAgICAgICAgfVxuICAgICAgICByZXNvbHZlZERhdGEgPSBncm91cFJlY3Vyc2l2ZWx5KHJlc29sdmVkRGF0YSwgcGl2b3RCeSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgLi4ubmV3U3RhdGUsXG4gICAgICAgIHJlc29sdmVkRGF0YSxcbiAgICAgICAgdmlzaWJsZUNvbHVtbnMsXG4gICAgICAgIGhlYWRlckdyb3VwcyxcbiAgICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucyxcbiAgICAgICAgaGFzSGVhZGVyR3JvdXBzLFxuICAgICAgfVxuICAgIH1cblxuICAgIGdldFNvcnRlZERhdGEgKHJlc29sdmVkU3RhdGUpIHtcbiAgICAgIGNvbnN0IHtcbiAgICAgICAgbWFudWFsLFxuICAgICAgICBzb3J0ZWQsXG4gICAgICAgIGZpbHRlcmVkLFxuICAgICAgICBkZWZhdWx0RmlsdGVyTWV0aG9kLFxuICAgICAgICByZXNvbHZlZERhdGEsXG4gICAgICAgIHZpc2libGVDb2x1bW5zLFxuICAgICAgICBhbGxEZWNvcmF0ZWRDb2x1bW5zLFxuICAgICAgfSA9IHJlc29sdmVkU3RhdGVcblxuICAgICAgY29uc3Qgc29ydE1ldGhvZHNCeUNvbHVtbklEID0ge31cblxuICAgICAgYWxsRGVjb3JhdGVkQ29sdW1ucy5maWx0ZXIoY29sID0+IGNvbC5zb3J0TWV0aG9kKS5mb3JFYWNoKGNvbCA9PiB7XG4gICAgICAgIHNvcnRNZXRob2RzQnlDb2x1bW5JRFtjb2wuaWRdID0gY29sLnNvcnRNZXRob2RcbiAgICAgIH0pXG5cbiAgICAgIC8vIFJlc29sdmUgdGhlIGRhdGEgZnJvbSBlaXRoZXIgbWFudWFsIGRhdGEgb3Igc29ydGVkIGRhdGFcbiAgICAgIHJldHVybiB7XG4gICAgICAgIHNvcnRlZERhdGE6IG1hbnVhbFxuICAgICAgICAgID8gcmVzb2x2ZWREYXRhXG4gICAgICAgICAgOiB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgICAgdGhpcy5maWx0ZXJEYXRhKHJlc29sdmVkRGF0YSwgZmlsdGVyZWQsIGRlZmF1bHRGaWx0ZXJNZXRob2QsIGFsbERlY29yYXRlZENvbHVtbnMpLFxuICAgICAgICAgICAgc29ydGVkLFxuICAgICAgICAgICAgc29ydE1ldGhvZHNCeUNvbHVtbklEXG4gICAgICAgICAgKSxcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmaXJlRmV0Y2hEYXRhICgpIHtcbiAgICAgIC8vIGRldGVybWluZSB0aGUgY3VycmVudCBzdGF0ZSwgcHJlZmVycmluZyBjZXJ0YWluIHN0YXRlIHZhbHVlcyBvdmVyIHByb3BzXG4gICAgICBjb25zdCBjdXJyZW50U3RhdGUgPSB7XG4gICAgICAgIC4uLnRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpLFxuICAgICAgICBwYWdlOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlJyksXG4gICAgICAgIHBhZ2VTaXplOiB0aGlzLmdldFN0YXRlT3JQcm9wKCdwYWdlU2l6ZScpLFxuICAgICAgICBmaWx0ZXI6IHRoaXMuZ2V0U3RhdGVPclByb3AoJ2ZpbHRlcicpLFxuICAgICAgfTtcblxuICAgICAgdGhpcy5wcm9wcy5vbkZldGNoRGF0YShjdXJyZW50U3RhdGUsIHRoaXMpXG4gICAgfVxuXG4gICAgZ2V0UHJvcE9yU3RhdGUgKGtleSkge1xuICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHRoaXMucHJvcHNba2V5XSwgdGhpcy5zdGF0ZVtrZXldKVxuICAgIH1cblxuICAgIGdldFN0YXRlT3JQcm9wIChrZXkpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnN0YXRlW2tleV0sIHRoaXMucHJvcHNba2V5XSlcbiAgICB9XG5cbiAgICBmaWx0ZXJEYXRhIChkYXRhLCBmaWx0ZXJlZCwgZGVmYXVsdEZpbHRlck1ldGhvZCwgdmlzaWJsZUNvbHVtbnMpIHtcbiAgICAgIGxldCBmaWx0ZXJlZERhdGEgPSBkYXRhXG5cbiAgICAgIGlmIChmaWx0ZXJlZC5sZW5ndGgpIHtcbiAgICAgICAgZmlsdGVyZWREYXRhID0gZmlsdGVyZWQucmVkdWNlKChmaWx0ZXJlZFNvRmFyLCBuZXh0RmlsdGVyKSA9PiB7XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gdmlzaWJsZUNvbHVtbnMuZmluZCh4ID0+IHguaWQgPT09IG5leHRGaWx0ZXIuaWQpXG5cbiAgICAgICAgICAvLyBEb24ndCBmaWx0ZXIgaGlkZGVuIGNvbHVtbnMgb3IgY29sdW1ucyB0aGF0IGhhdmUgaGFkIHRoZWlyIGZpbHRlcnMgZGlzYWJsZWRcbiAgICAgICAgICBpZiAoIWNvbHVtbiB8fCBjb2x1bW4uZmlsdGVyYWJsZSA9PT0gZmFsc2UpIHtcbiAgICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgY29uc3QgZmlsdGVyTWV0aG9kID0gY29sdW1uLmZpbHRlck1ldGhvZCB8fCBkZWZhdWx0RmlsdGVyTWV0aG9kXG5cbiAgICAgICAgICAvLyBJZiAnZmlsdGVyQWxsJyBpcyBzZXQgdG8gdHJ1ZSwgcGFzcyB0aGUgZW50aXJlIGRhdGFzZXQgdG8gdGhlIGZpbHRlciBtZXRob2RcbiAgICAgICAgICBpZiAoY29sdW1uLmZpbHRlckFsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZpbHRlck1ldGhvZChuZXh0RmlsdGVyLCBmaWx0ZXJlZFNvRmFyLCBjb2x1bW4pXG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBmaWx0ZXJlZFNvRmFyLmZpbHRlcihyb3cgPT4gZmlsdGVyTWV0aG9kKG5leHRGaWx0ZXIsIHJvdywgY29sdW1uKSlcbiAgICAgICAgfSwgZmlsdGVyZWREYXRhKVxuXG4gICAgICAgIC8vIEFwcGx5IHRoZSBmaWx0ZXIgdG8gdGhlIHN1YnJvd3MgaWYgd2UgYXJlIHBpdm90aW5nLCBhbmQgdGhlblxuICAgICAgICAvLyBmaWx0ZXIgYW55IHJvd3Mgd2l0aG91dCBzdWJjb2x1bW5zIGJlY2F1c2UgaXQgd291bGQgYmUgc3RyYW5nZSB0byBzaG93XG4gICAgICAgIGZpbHRlcmVkRGF0YSA9IGZpbHRlcmVkRGF0YVxuICAgICAgICAgIC5tYXAocm93ID0+IHtcbiAgICAgICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHJvd1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgICAgLi4ucm93LFxuICAgICAgICAgICAgICBbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XTogdGhpcy5maWx0ZXJEYXRhKFxuICAgICAgICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgICAgICAgIGZpbHRlcmVkLFxuICAgICAgICAgICAgICAgIGRlZmF1bHRGaWx0ZXJNZXRob2QsXG4gICAgICAgICAgICAgICAgdmlzaWJsZUNvbHVtbnNcbiAgICAgICAgICAgICAgKSxcbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9KVxuICAgICAgICAgIC5maWx0ZXIocm93ID0+IHtcbiAgICAgICAgICAgIGlmICghcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0pIHtcbiAgICAgICAgICAgICAgcmV0dXJuIHRydWVcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHJldHVybiByb3dbdGhpcy5wcm9wcy5zdWJSb3dzS2V5XS5sZW5ndGggPiAwXG4gICAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcmV0dXJuIGZpbHRlcmVkRGF0YVxuICAgIH1cblxuICAgIHNvcnREYXRhIChkYXRhLCBzb3J0ZWQsIHNvcnRNZXRob2RzQnlDb2x1bW5JRCA9IHt9KSB7XG4gICAgICBpZiAoIXNvcnRlZC5sZW5ndGgpIHtcbiAgICAgICAgcmV0dXJuIGRhdGFcbiAgICAgIH1cblxuICAgICAgY29uc3Qgc29ydGVkRGF0YSA9ICh0aGlzLnByb3BzLm9yZGVyQnlNZXRob2QgfHwgXy5vcmRlckJ5KShcbiAgICAgICAgZGF0YSxcbiAgICAgICAgc29ydGVkLm1hcChzb3J0ID0+IHtcbiAgICAgICAgICAvLyBTdXBwb3J0IGN1c3RvbSBzb3J0aW5nIG1ldGhvZHMgZm9yIGVhY2ggY29sdW1uXG4gICAgICAgICAgaWYgKHNvcnRNZXRob2RzQnlDb2x1bW5JRFtzb3J0LmlkXSkge1xuICAgICAgICAgICAgcmV0dXJuIChhLCBiKSA9PiBzb3J0TWV0aG9kc0J5Q29sdW1uSURbc29ydC5pZF0oYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gKGEsIGIpID0+IHRoaXMucHJvcHMuZGVmYXVsdFNvcnRNZXRob2QoYVtzb3J0LmlkXSwgYltzb3J0LmlkXSwgc29ydC5kZXNjKVxuICAgICAgICB9KSxcbiAgICAgICAgc29ydGVkLm1hcChkID0+ICFkLmRlc2MpLFxuICAgICAgICB0aGlzLnByb3BzLmluZGV4S2V5XG4gICAgICApXG5cbiAgICAgIHNvcnRlZERhdGEuZm9yRWFjaChyb3cgPT4ge1xuICAgICAgICBpZiAoIXJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldKSB7XG4gICAgICAgICAgcmV0dXJuXG4gICAgICAgIH1cbiAgICAgICAgcm93W3RoaXMucHJvcHMuc3ViUm93c0tleV0gPSB0aGlzLnNvcnREYXRhKFxuICAgICAgICAgIHJvd1t0aGlzLnByb3BzLnN1YlJvd3NLZXldLFxuICAgICAgICAgIHNvcnRlZCxcbiAgICAgICAgICBzb3J0TWV0aG9kc0J5Q29sdW1uSURcbiAgICAgICAgKVxuICAgICAgfSlcblxuICAgICAgcmV0dXJuIHNvcnRlZERhdGFcbiAgICB9XG5cbiAgICBnZXRNaW5Sb3dzICgpIHtcbiAgICAgIHJldHVybiBfLmdldEZpcnN0RGVmaW5lZCh0aGlzLnByb3BzLm1pblJvd3MsIHRoaXMuZ2V0U3RhdGVPclByb3AoJ3BhZ2VTaXplJykpXG4gICAgfVxuXG4gICAgLy8gVXNlciBhY3Rpb25zXG4gICAgb25QYWdlQ2hhbmdlIChwYWdlKSB7XG4gICAgICBjb25zdCB7IG9uUGFnZUNoYW5nZSwgY29sbGFwc2VPblBhZ2VDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgY29uc3QgbmV3U3RhdGUgPSB7IHBhZ2UgfVxuICAgICAgaWYgKGNvbGxhcHNlT25QYWdlQ2hhbmdlKSB7XG4gICAgICAgIG5ld1N0YXRlLmV4cGFuZGVkID0ge31cbiAgICAgIH1cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShuZXdTdGF0ZSwgKCkgPT4gb25QYWdlQ2hhbmdlICYmIG9uUGFnZUNoYW5nZShwYWdlKSlcbiAgICB9XG5cbiAgICBvblBhZ2VTaXplQ2hhbmdlIChuZXdQYWdlU2l6ZSkge1xuICAgICAgY29uc3QgeyBvblBhZ2VTaXplQ2hhbmdlIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7IHBhZ2VTaXplLCBwYWdlIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuXG4gICAgICAvLyBOb3JtYWxpemUgdGhlIHBhZ2UgdG8gZGlzcGxheVxuICAgICAgY29uc3QgY3VycmVudFJvdyA9IHBhZ2VTaXplICogcGFnZVxuICAgICAgY29uc3QgbmV3UGFnZSA9IE1hdGguZmxvb3IoY3VycmVudFJvdyAvIG5ld1BhZ2VTaXplKVxuXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICBwYWdlU2l6ZTogbmV3UGFnZVNpemUsXG4gICAgICAgICAgcGFnZTogbmV3UGFnZSxcbiAgICAgICAgfSxcbiAgICAgICAgKCkgPT4gb25QYWdlU2l6ZUNoYW5nZSAmJiBvblBhZ2VTaXplQ2hhbmdlKG5ld1BhZ2VTaXplLCBuZXdQYWdlKVxuICAgICAgKVxuICAgIH1cblxuICAgIHNvcnRDb2x1bW4gKGNvbHVtbiwgYWRkaXRpdmUpIHtcbiAgICAgIGNvbnN0IHsgc29ydGVkLCBza2lwTmV4dFNvcnQsIGRlZmF1bHRTb3J0RGVzYyB9ID0gdGhpcy5nZXRSZXNvbHZlZFN0YXRlKClcblxuICAgICAgY29uc3QgZmlyc3RTb3J0RGlyZWN0aW9uID0gT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKGNvbHVtbiwgJ2RlZmF1bHRTb3J0RGVzYycpXG4gICAgICAgID8gY29sdW1uLmRlZmF1bHRTb3J0RGVzY1xuICAgICAgICA6IGRlZmF1bHRTb3J0RGVzY1xuICAgICAgY29uc3Qgc2Vjb25kU29ydERpcmVjdGlvbiA9ICFmaXJzdFNvcnREaXJlY3Rpb25cblxuICAgICAgLy8gd2UgY2FuJ3Qgc3RvcCBldmVudCBwcm9wYWdhdGlvbiBmcm9tIHRoZSBjb2x1bW4gcmVzaXplIG1vdmUgaGFuZGxlcnNcbiAgICAgIC8vIGF0dGFjaGVkIHRvIHRoZSBkb2N1bWVudCBiZWNhdXNlIG9mIHJlYWN0J3Mgc3ludGhldGljIGV2ZW50c1xuICAgICAgLy8gc28gd2UgaGF2ZSB0byBwcmV2ZW50IHRoZSBzb3J0IGZ1bmN0aW9uIGZyb20gYWN0dWFsbHkgc29ydGluZ1xuICAgICAgLy8gaWYgd2UgY2xpY2sgb24gdGhlIGNvbHVtbiByZXNpemUgZWxlbWVudCB3aXRoaW4gYSBoZWFkZXIuXG4gICAgICBpZiAoc2tpcE5leHRTb3J0KSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgc2tpcE5leHRTb3J0OiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgICAgcmV0dXJuXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHsgb25Tb3J0ZWRDaGFuZ2UgfSA9IHRoaXMucHJvcHNcblxuICAgICAgbGV0IG5ld1NvcnRlZCA9IF8uY2xvbmUoc29ydGVkIHx8IFtdKS5tYXAoZCA9PiB7XG4gICAgICAgIGQuZGVzYyA9IF8uaXNTb3J0aW5nRGVzYyhkKVxuICAgICAgICByZXR1cm4gZFxuICAgICAgfSlcbiAgICAgIGlmICghXy5pc0FycmF5KGNvbHVtbikpIHtcbiAgICAgICAgLy8gU2luZ2xlLVNvcnRcbiAgICAgICAgY29uc3QgZXhpc3RpbmdJbmRleCA9IG5ld1NvcnRlZC5maW5kSW5kZXgoZCA9PiBkLmlkID09PSBjb2x1bW4uaWQpXG4gICAgICAgIGlmIChleGlzdGluZ0luZGV4ID4gLTEpIHtcbiAgICAgICAgICBjb25zdCBleGlzdGluZyA9IG5ld1NvcnRlZFtleGlzdGluZ0luZGV4XVxuICAgICAgICAgIGlmIChleGlzdGluZy5kZXNjID09PSBzZWNvbmRTb3J0RGlyZWN0aW9uKSB7XG4gICAgICAgICAgICBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICAgICAgbmV3U29ydGVkLnNwbGljZShleGlzdGluZ0luZGV4LCAxKVxuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgZXhpc3RpbmcuZGVzYyA9IGZpcnN0U29ydERpcmVjdGlvblxuICAgICAgICAgICAgICBuZXdTb3J0ZWQgPSBbZXhpc3RpbmddXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGV4aXN0aW5nLmRlc2MgPSBzZWNvbmRTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICBpZiAoIWFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZCA9IFtleGlzdGluZ11cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSBpZiAoYWRkaXRpdmUpIHtcbiAgICAgICAgICBuZXdTb3J0ZWQucHVzaCh7XG4gICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgIH0pXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgbmV3U29ydGVkID0gW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICBpZDogY29sdW1uLmlkLFxuICAgICAgICAgICAgICBkZXNjOiBmaXJzdFNvcnREaXJlY3Rpb24sXG4gICAgICAgICAgICB9LFxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgLy8gTXVsdGktU29ydFxuICAgICAgICBjb25zdCBleGlzdGluZ0luZGV4ID0gbmV3U29ydGVkLmZpbmRJbmRleChkID0+IGQuaWQgPT09IGNvbHVtblswXS5pZClcbiAgICAgICAgLy8gRXhpc3RpbmcgU29ydGVkIENvbHVtblxuICAgICAgICBpZiAoZXhpc3RpbmdJbmRleCA+IC0xKSB7XG4gICAgICAgICAgY29uc3QgZXhpc3RpbmcgPSBuZXdTb3J0ZWRbZXhpc3RpbmdJbmRleF1cbiAgICAgICAgICBpZiAoZXhpc3RpbmcuZGVzYyA9PT0gc2Vjb25kU29ydERpcmVjdGlvbikge1xuICAgICAgICAgICAgaWYgKGFkZGl0aXZlKSB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZC5zcGxpY2UoZXhpc3RpbmdJbmRleCwgY29sdW1uLmxlbmd0aClcbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgICAgbmV3U29ydGVkW2V4aXN0aW5nSW5kZXggKyBpXS5kZXNjID0gZmlyc3RTb3J0RGlyZWN0aW9uXG4gICAgICAgICAgICAgIH0pXG4gICAgICAgICAgICB9XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbHVtbi5mb3JFYWNoKChkLCBpKSA9PiB7XG4gICAgICAgICAgICAgIG5ld1NvcnRlZFtleGlzdGluZ0luZGV4ICsgaV0uZGVzYyA9IHNlY29uZFNvcnREaXJlY3Rpb25cbiAgICAgICAgICAgIH0pXG4gICAgICAgICAgfVxuICAgICAgICAgIGlmICghYWRkaXRpdmUpIHtcbiAgICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5zbGljZShleGlzdGluZ0luZGV4LCBjb2x1bW4ubGVuZ3RoKVxuICAgICAgICAgIH1cbiAgICAgICAgICAvLyBOZXcgU29ydCBDb2x1bW5cbiAgICAgICAgfSBlbHNlIGlmIChhZGRpdGl2ZSkge1xuICAgICAgICAgIG5ld1NvcnRlZCA9IG5ld1NvcnRlZC5jb25jYXQoXG4gICAgICAgICAgICBjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgICAgaWQ6IGQuaWQsXG4gICAgICAgICAgICAgIGRlc2M6IGZpcnN0U29ydERpcmVjdGlvbixcbiAgICAgICAgICAgIH0pKVxuICAgICAgICAgIClcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICBuZXdTb3J0ZWQgPSBjb2x1bW4ubWFwKGQgPT4gKHtcbiAgICAgICAgICAgIGlkOiBkLmlkLFxuICAgICAgICAgICAgZGVzYzogZmlyc3RTb3J0RGlyZWN0aW9uLFxuICAgICAgICAgIH0pKVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIHBhZ2U6ICghc29ydGVkLmxlbmd0aCAmJiBuZXdTb3J0ZWQubGVuZ3RoKSB8fCAhYWRkaXRpdmUgPyAwIDogdGhpcy5zdGF0ZS5wYWdlLFxuICAgICAgICAgIHNvcnRlZDogbmV3U29ydGVkLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvblNvcnRlZENoYW5nZSAmJiBvblNvcnRlZENoYW5nZShuZXdTb3J0ZWQsIGNvbHVtbiwgYWRkaXRpdmUpXG4gICAgICApXG4gICAgfVxuXG4gICAgZmlsdGVyQ29sdW1uIChjb2x1bW4sIHZhbHVlKSB7XG4gICAgICBjb25zdCB7IGZpbHRlcmVkIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgICAgY29uc3QgeyBvbkZpbHRlcmVkQ2hhbmdlIH0gPSB0aGlzLnByb3BzXG5cbiAgICAgIC8vIFJlbW92ZSBvbGQgZmlsdGVyIGZpcnN0IGlmIGl0IGV4aXN0c1xuICAgICAgY29uc3QgbmV3RmlsdGVyaW5nID0gKGZpbHRlcmVkIHx8IFtdKS5maWx0ZXIoeCA9PiB4LmlkICE9PSBjb2x1bW4uaWQpXG5cbiAgICAgIGlmICh2YWx1ZSAhPT0gJycpIHtcbiAgICAgICAgbmV3RmlsdGVyaW5nLnB1c2goe1xuICAgICAgICAgIGlkOiBjb2x1bW4uaWQsXG4gICAgICAgICAgdmFsdWUsXG4gICAgICAgIH0pXG4gICAgICB9XG5cbiAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YShcbiAgICAgICAge1xuICAgICAgICAgIGZpbHRlcmVkOiBuZXdGaWx0ZXJpbmcsXG4gICAgICAgIH0sXG4gICAgICAgICgpID0+IG9uRmlsdGVyZWRDaGFuZ2UgJiYgb25GaWx0ZXJlZENoYW5nZShuZXdGaWx0ZXJpbmcsIGNvbHVtbiwgdmFsdWUpXG4gICAgICApXG4gICAgfVxuXG4gICAgcmVzaXplQ29sdW1uU3RhcnQgKGV2ZW50LCBjb2x1bW4sIGlzVG91Y2gpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBjb25zdCBwYXJlbnRXaWR0aCA9IGV2ZW50LnRhcmdldC5wYXJlbnRFbGVtZW50LmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpLndpZHRoXG5cbiAgICAgIGxldCBwYWdlWFxuICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5jaGFuZ2VkVG91Y2hlc1swXS5wYWdlWFxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgcGFnZVggPSBldmVudC5wYWdlWFxuICAgICAgfVxuXG4gICAgICB0aGlzLnRyYXBFdmVudHMgPSB0cnVlXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICBjdXJyZW50bHlSZXNpemluZzoge1xuICAgICAgICAgICAgaWQ6IGNvbHVtbi5pZCxcbiAgICAgICAgICAgIHN0YXJ0WDogcGFnZVgsXG4gICAgICAgICAgICBwYXJlbnRXaWR0aCxcbiAgICAgICAgICB9LFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiB7XG4gICAgICAgICAgaWYgKGlzVG91Y2gpIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcigndG91Y2hjYW5jZWwnLCB0aGlzLnJlc2l6ZUNvbHVtbkVuZClcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ3RvdWNoZW5kJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGRvY3VtZW50LmFkZEV2ZW50TGlzdGVuZXIoJ21vdXNlbW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2V1cCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgICAgZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignbW91c2VsZWF2ZScsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgKVxuICAgIH1cblxuICAgIHJlc2l6ZUNvbHVtbk1vdmluZyAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBjb25zdCB7IG9uUmVzaXplZENoYW5nZSwgY29sdW1uIH0gPSB0aGlzLnByb3BzXG4gICAgICBjb25zdCB7IHJlc2l6ZWQsIGN1cnJlbnRseVJlc2l6aW5nLCBjb2x1bW5zIH0gPSB0aGlzLmdldFJlc29sdmVkU3RhdGUoKVxuICAgICAgY29uc3QgY3VycmVudENvbHVtbiA9IGNvbHVtbnMuZmluZChjID0+IGMuYWNjZXNzb3IgPT09IGN1cnJlbnRseVJlc2l6aW5nLmlkKVxuICAgICAgY29uc3QgbWluUmVzaXplV2lkdGggPSBjdXJyZW50Q29sdW1uID8gY3VycmVudENvbHVtbi5taW5SZXNpemVXaWR0aCA6IGNvbHVtbi5taW5SZXNpemVXaWR0aFxuXG4gICAgICAvLyBEZWxldGUgb2xkIHZhbHVlXG4gICAgICBjb25zdCBuZXdSZXNpemVkID0gcmVzaXplZC5maWx0ZXIoeCA9PiB4LmlkICE9PSBjdXJyZW50bHlSZXNpemluZy5pZClcblxuICAgICAgbGV0IHBhZ2VYXG5cbiAgICAgIGlmIChldmVudC50eXBlID09PSAndG91Y2htb3ZlJykge1xuICAgICAgICBwYWdlWCA9IGV2ZW50LmNoYW5nZWRUb3VjaGVzWzBdLnBhZ2VYXG4gICAgICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgICAgIHBhZ2VYID0gZXZlbnQucGFnZVhcbiAgICAgIH1cblxuICAgICAgY29uc3QgbmV3V2lkdGggPSBNYXRoLm1heChcbiAgICAgICAgY3VycmVudGx5UmVzaXppbmcucGFyZW50V2lkdGggKyBwYWdlWCAtIGN1cnJlbnRseVJlc2l6aW5nLnN0YXJ0WCxcbiAgICAgICAgbWluUmVzaXplV2lkdGhcbiAgICAgIClcblxuICAgICAgbmV3UmVzaXplZC5wdXNoKHtcbiAgICAgICAgaWQ6IGN1cnJlbnRseVJlc2l6aW5nLmlkLFxuICAgICAgICB2YWx1ZTogbmV3V2lkdGgsXG4gICAgICB9KVxuXG4gICAgICB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgIHtcbiAgICAgICAgICByZXNpemVkOiBuZXdSZXNpemVkLFxuICAgICAgICB9LFxuICAgICAgICAoKSA9PiBvblJlc2l6ZWRDaGFuZ2UgJiYgb25SZXNpemVkQ2hhbmdlKG5ld1Jlc2l6ZWQsIGV2ZW50KVxuICAgICAgKVxuICAgIH1cblxuICAgIHJlc2l6ZUNvbHVtbkVuZCAoZXZlbnQpIHtcbiAgICAgIGV2ZW50LnN0b3BQcm9wYWdhdGlvbigpXG4gICAgICBjb25zdCBpc1RvdWNoID0gZXZlbnQudHlwZSA9PT0gJ3RvdWNoZW5kJyB8fCBldmVudC50eXBlID09PSAndG91Y2hjYW5jZWwnXG5cbiAgICAgIGlmIChpc1RvdWNoKSB7XG4gICAgICAgIGRvY3VtZW50LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3RvdWNobW92ZScsIHRoaXMucmVzaXplQ29sdW1uTW92aW5nKVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGNhbmNlbCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCd0b3VjaGVuZCcsIHRoaXMucmVzaXplQ29sdW1uRW5kKVxuICAgICAgfVxuXG4gICAgICAvLyBJZiBpdHMgYSB0b3VjaCBldmVudCBjbGVhciB0aGUgbW91c2Ugb25lJ3MgYXMgd2VsbCBiZWNhdXNlIHNvbWV0aW1lc1xuICAgICAgLy8gdGhlIG1vdXNlRG93biBldmVudCBnZXRzIGNhbGxlZCBhcyB3ZWxsLCBidXQgdGhlIG1vdXNlVXAgZXZlbnQgZG9lc24ndFxuICAgICAgZG9jdW1lbnQucmVtb3ZlRXZlbnRMaXN0ZW5lcignbW91c2Vtb3ZlJywgdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZXVwJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG4gICAgICBkb2N1bWVudC5yZW1vdmVFdmVudExpc3RlbmVyKCdtb3VzZWxlYXZlJywgdGhpcy5yZXNpemVDb2x1bW5FbmQpXG5cbiAgICAgIC8vIFRoZSB0b3VjaCBldmVudHMgZG9uJ3QgcHJvcGFnYXRlIHVwIHRvIHRoZSBzb3J0aW5nJ3Mgb25Nb3VzZURvd24gZXZlbnQgc29cbiAgICAgIC8vIG5vIG5lZWQgdG8gcHJldmVudCBpdCBmcm9tIGhhcHBlbmluZyBvciBlbHNlIHRoZSBmaXJzdCBjbGljayBhZnRlciBhIHRvdWNoXG4gICAgICAvLyBldmVudCByZXNpemUgd2lsbCBub3Qgc29ydCB0aGUgY29sdW1uLlxuICAgICAgaWYgKCFpc1RvdWNoKSB7XG4gICAgICAgIHRoaXMuc2V0U3RhdGVXaXRoRGF0YSh7XG4gICAgICAgICAgc2tpcE5leHRTb3J0OiB0cnVlLFxuICAgICAgICAgIGN1cnJlbnRseVJlc2l6aW5nOiBmYWxzZSxcbiAgICAgICAgfSlcbiAgICAgIH1cbiAgICB9XG4gIH1cbiJdfQ==