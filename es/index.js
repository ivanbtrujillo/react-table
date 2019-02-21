var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

import React, { Component } from 'react';
import classnames from 'classnames';
//
import _ from './utils';
import Lifecycle from './lifecycle';
import Methods from './methods';
import defaultProps from './defaultProps';
import propTypes from './propTypes';

export var ReactTableDefaults = defaultProps;

var ReactTable = function (_Methods) {
  _inherits(ReactTable, _Methods);

  function ReactTable(props) {
    _classCallCheck(this, ReactTable);

    var _this = _possibleConstructorReturn(this, (ReactTable.__proto__ || Object.getPrototypeOf(ReactTable)).call(this));

    _this.getResolvedState = _this.getResolvedState.bind(_this);
    _this.getDataModel = _this.getDataModel.bind(_this);
    _this.getSortedData = _this.getSortedData.bind(_this);
    _this.fireFetchData = _this.fireFetchData.bind(_this);
    _this.getPropOrState = _this.getPropOrState.bind(_this);
    _this.getStateOrProp = _this.getStateOrProp.bind(_this);
    _this.filterData = _this.filterData.bind(_this);
    _this.sortData = _this.sortData.bind(_this);
    _this.getMinRows = _this.getMinRows.bind(_this);
    _this.onPageChange = _this.onPageChange.bind(_this);
    _this.onPageSizeChange = _this.onPageSizeChange.bind(_this);
    _this.sortColumn = _this.sortColumn.bind(_this);
    _this.filterColumn = _this.filterColumn.bind(_this);
    _this.resizeColumnStart = _this.resizeColumnStart.bind(_this);
    _this.resizeColumnEnd = _this.resizeColumnEnd.bind(_this);
    _this.resizeColumnMoving = _this.resizeColumnMoving.bind(_this);

    _this.state = {
      page: props.defaultPage,
      pageSize: props.defaultPageSize,
      sorted: props.defaultSorted,
      expanded: props.defaultExpanded,
      filtered: props.defaultFiltered,
      resized: props.defaultResized,
      currentlyResizing: false,
      skipNextSort: false
    };
    return _this;
  }

  _createClass(ReactTable, [{
    key: 'render',
    value: function render() {
      var _this2 = this;

      var resolvedState = this.getResolvedState();
      var children = resolvedState.children,
          className = resolvedState.className,
          style = resolvedState.style,
          getProps = resolvedState.getProps,
          getTableProps = resolvedState.getTableProps,
          getTheadGroupProps = resolvedState.getTheadGroupProps,
          getTheadGroupTrProps = resolvedState.getTheadGroupTrProps,
          getTheadGroupThProps = resolvedState.getTheadGroupThProps,
          getTheadProps = resolvedState.getTheadProps,
          getTheadTrProps = resolvedState.getTheadTrProps,
          getTheadThProps = resolvedState.getTheadThProps,
          getTheadFilterProps = resolvedState.getTheadFilterProps,
          getTheadFilterTrProps = resolvedState.getTheadFilterTrProps,
          getTheadFilterThProps = resolvedState.getTheadFilterThProps,
          getTbodyProps = resolvedState.getTbodyProps,
          getTrGroupProps = resolvedState.getTrGroupProps,
          getTrProps = resolvedState.getTrProps,
          getTdProps = resolvedState.getTdProps,
          getTfootProps = resolvedState.getTfootProps,
          getTfootTrProps = resolvedState.getTfootTrProps,
          getTfootTdProps = resolvedState.getTfootTdProps,
          getPaginationProps = resolvedState.getPaginationProps,
          getLoadingProps = resolvedState.getLoadingProps,
          getNoDataProps = resolvedState.getNoDataProps,
          getResizerProps = resolvedState.getResizerProps,
          showPagination = resolvedState.showPagination,
          showPaginationTop = resolvedState.showPaginationTop,
          showPaginationBottom = resolvedState.showPaginationBottom,
          manual = resolvedState.manual,
          loadingText = resolvedState.loadingText,
          noDataText = resolvedState.noDataText,
          sortable = resolvedState.sortable,
          multiSort = resolvedState.multiSort,
          resizable = resolvedState.resizable,
          filterable = resolvedState.filterable,
          pivotIDKey = resolvedState.pivotIDKey,
          pivotValKey = resolvedState.pivotValKey,
          pivotBy = resolvedState.pivotBy,
          subRowsKey = resolvedState.subRowsKey,
          aggregatedKey = resolvedState.aggregatedKey,
          originalKey = resolvedState.originalKey,
          indexKey = resolvedState.indexKey,
          groupedByPivotKey = resolvedState.groupedByPivotKey,
          loading = resolvedState.loading,
          pageSize = resolvedState.pageSize,
          page = resolvedState.page,
          sorted = resolvedState.sorted,
          filtered = resolvedState.filtered,
          resized = resolvedState.resized,
          expanded = resolvedState.expanded,
          pages = resolvedState.pages,
          onExpandedChange = resolvedState.onExpandedChange,
          TableComponent = resolvedState.TableComponent,
          TheadComponent = resolvedState.TheadComponent,
          TbodyComponent = resolvedState.TbodyComponent,
          TrGroupComponent = resolvedState.TrGroupComponent,
          TrComponent = resolvedState.TrComponent,
          ThComponent = resolvedState.ThComponent,
          TdComponent = resolvedState.TdComponent,
          TfootComponent = resolvedState.TfootComponent,
          PaginationComponent = resolvedState.PaginationComponent,
          LoadingComponent = resolvedState.LoadingComponent,
          SubComponent = resolvedState.SubComponent,
          NoDataComponent = resolvedState.NoDataComponent,
          ResizerComponent = resolvedState.ResizerComponent,
          ExpanderComponent = resolvedState.ExpanderComponent,
          PivotValueComponent = resolvedState.PivotValueComponent,
          PivotComponent = resolvedState.PivotComponent,
          AggregatedComponent = resolvedState.AggregatedComponent,
          FilterComponent = resolvedState.FilterComponent,
          PadRowComponent = resolvedState.PadRowComponent,
          resolvedData = resolvedState.resolvedData,
          visibleColumns = resolvedState.visibleColumns,
          headerGroups = resolvedState.headerGroups,
          hasHeaderGroups = resolvedState.hasHeaderGroups,
          sortedData = resolvedState.sortedData,
          currentlyResizing = resolvedState.currentlyResizing;

      // Pagination

      var startRow = pageSize * page;
      var endRow = startRow + pageSize;
      var pageRows = manual ? resolvedData : sortedData.slice(startRow, endRow);
      var minRows = this.getMinRows();
      var padRows = _.range(Math.max(minRows - pageRows.length, 0));

      var hasColumnFooter = visibleColumns.some(function (d) {
        return d.Footer;
      });
      var hasFilters = filterable || visibleColumns.some(function (d) {
        return d.filterable;
      });

      var recurseRowsViewIndex = function recurseRowsViewIndex(rows) {
        var path = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
        var index = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : -1;
        return [rows.map(function (row, i) {
          index += 1;
          var rowWithViewIndex = _extends({}, row, {
            _viewIndex: index
          });
          var newPath = path.concat([i]);
          if (rowWithViewIndex[subRowsKey] && _.get(expanded, newPath)) {
            var _recurseRowsViewIndex = recurseRowsViewIndex(rowWithViewIndex[subRowsKey], newPath, index);

            var _recurseRowsViewIndex2 = _slicedToArray(_recurseRowsViewIndex, 2);

            rowWithViewIndex[subRowsKey] = _recurseRowsViewIndex2[0];
            index = _recurseRowsViewIndex2[1];
          }
          return rowWithViewIndex;
        }), index];
      };

      var _recurseRowsViewIndex3 = recurseRowsViewIndex(pageRows);

      var _recurseRowsViewIndex4 = _slicedToArray(_recurseRowsViewIndex3, 1);

      pageRows = _recurseRowsViewIndex4[0];


      var canPrevious = page > 0;
      var canNext = page + 1 < pages;

      var rowMinWidth = _.sum(visibleColumns.map(function (d) {
        var resizedColumn = resized.find(function (x) {
          return x.id === d.id;
        }) || {};
        return _.getFirstDefined(resizedColumn.value, d.width, d.minWidth);
      }));

      var rowIndex = -1;

      var finalState = _extends({}, resolvedState, {
        startRow: startRow,
        endRow: endRow,
        pageRows: pageRows,
        minRows: minRows,
        padRows: padRows,
        hasColumnFooter: hasColumnFooter,
        canPrevious: canPrevious,
        canNext: canNext,
        rowMinWidth: rowMinWidth
      });

      var rootProps = _.splitProps(getProps(finalState, undefined, undefined, this));
      var tableProps = _.splitProps(getTableProps(finalState, undefined, undefined, this));
      var tBodyProps = _.splitProps(getTbodyProps(finalState, undefined, undefined, this));
      var loadingProps = getLoadingProps(finalState, undefined, undefined, this);
      var noDataProps = getNoDataProps(finalState, undefined, undefined, this);

      // Visual Components

      var makeHeaderGroup = function makeHeaderGroup(column, i) {
        var resizedValue = function resizedValue(col) {
          return (resized.find(function (x) {
            return x.id === col.id;
          }) || {}).value;
        };

        var leafColumns = _.leaves(column, 'columns');
        var flex = _.sum(leafColumns.map(function (col) {
          return col.width || resizedValue(col) ? 0 : col.minWidth;
        }));
        var width = _.sum(leafColumns.map(function (col) {
          return _.getFirstDefined(resizedValue(col), col.width, col.minWidth);
        }));
        var maxWidth = _.sum(leafColumns.map(function (col) {
          return _.getFirstDefined(resizedValue(col), col.width, col.maxWidth);
        }));

        var theadGroupThProps = _.splitProps(getTheadGroupThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadGroupThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadGroupThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadGroupThProps.rest, columnHeaderProps.rest);

        var flexStyles = {
          flex: flex + ' 0 auto',
          width: _.asPx(width),
          maxWidth: _.asPx(maxWidth)
        };

        return React.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames(classes),
            style: _extends({}, styles, flexStyles)
          }, rest),
          _.normalizeComponent(column.Header, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeHeaderGroups = function makeHeaderGroups(row, i) {
        var theadGroupProps = _.splitProps(getTheadGroupProps(finalState, undefined, row, _this2));
        var theadGroupTrProps = _.splitProps(getTheadGroupTrProps(finalState, undefined, row, _this2));
        return React.createElement(
          TheadComponent,
          _extends({
            key: i + '-' + row.id,
            className: classnames('-headerGroups', theadGroupProps.className),
            style: _extends({

              minWidth: rowMinWidth + 'px'
            }, theadGroupProps.style)
          }, theadGroupProps.rest),
          React.createElement(
            TrComponent,
            _extends({
              className: theadGroupTrProps.className,
              style: theadGroupTrProps.style
            }, theadGroupTrProps.rest),
            row.map(makeHeaderGroup)
          )
        );
      };

      var makeHeader = function makeHeader(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var sort = sorted.find(function (d) {
          return d.id === column.id;
        });
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadThProps = _.splitProps(getTheadThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadThProps.rest, columnHeaderProps.rest);

        var isResizable = _.getFirstDefined(column.resizable, resizable, false);
        var resizer = isResizable ? React.createElement(ResizerComponent, _extends({
          onMouseDown: function onMouseDown(e) {
            return _this2.resizeColumnStart(e, column, false);
          },
          onTouchStart: function onTouchStart(e) {
            return _this2.resizeColumnStart(e, column, true);
          }
        }, getResizerProps('finalState', undefined, column, _this2))) : null;

        var isSortable = _.getFirstDefined(column.sortable, sortable, false);

        return React.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames(classes, isResizable && 'rt-resizable-header', sort ? sort.desc ? '-sort-desc' : '-sort-asc' : '', isSortable && '-cursor-pointer', !show && '-hidden', pivotBy && pivotBy.slice(0, -1).includes(column.id) && 'rt-header-pivot'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _.asPx(width),
              maxWidth: _.asPx(maxWidth)
            }),
            toggleSort: function toggleSort(e) {
              if (isSortable) _this2.sortColumn(column, multiSort ? e.shiftKey : false);
            }
          }, rest),
          React.createElement(
            'div',
            { className: classnames(isResizable && 'rt-resizable-header-content') },
            _.normalizeComponent(column.Header, {
              data: sortedData,
              column: column
            })
          ),
          resizer
        );
      };

      var makeHeaders = function makeHeaders() {
        var theadProps = _.splitProps(getTheadProps(finalState, undefined, undefined, _this2));
        var theadTrProps = _.splitProps(getTheadTrProps(finalState, undefined, undefined, _this2));
        return React.createElement(
          TheadComponent,
          _extends({
            className: classnames('-header', theadProps.className),
            style: _extends({

              minWidth: rowMinWidth + 'px'
            }, theadProps.style)
          }, theadProps.rest),
          React.createElement(
            TrComponent,
            _extends({
              className: theadTrProps.className,
              style: theadTrProps.style
            }, theadTrProps.rest),
            visibleColumns.map(makeHeader)
          )
        );
      };

      var makeFilter = function makeFilter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var width = _.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var theadFilterThProps = _.splitProps(getTheadFilterThProps(finalState, undefined, column, _this2));
        var columnHeaderProps = _.splitProps(column.getHeaderProps(finalState, undefined, column, _this2));

        var classes = [column.headerClassName, theadFilterThProps.className, columnHeaderProps.className];

        var styles = _extends({}, column.headerStyle, theadFilterThProps.style, columnHeaderProps.style);

        var rest = _extends({}, theadFilterThProps.rest, columnHeaderProps.rest);

        var filter = filtered.find(function (filter) {
          return filter.id === column.id;
        });

        var ResolvedFilterComponent = column.Filter || FilterComponent;

        var isFilterable = _.getFirstDefined(column.filterable, filterable, false);

        return React.createElement(
          ThComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames(classes),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _.asPx(width),
              maxWidth: _.asPx(maxWidth)
            })
          }, rest),
          isFilterable ? _.normalizeComponent(ResolvedFilterComponent, {
            column: column,
            filter: filter,
            onChange: function onChange(value) {
              return _this2.filterColumn(column, value);
            }
          }, defaultProps.column.Filter) : null
        );
      };

      var makeFilters = function makeFilters() {
        var theadFilterProps = _.splitProps(getTheadFilterProps(finalState, undefined, undefined, _this2));
        var theadFilterTrProps = _.splitProps(getTheadFilterTrProps(finalState, undefined, undefined, _this2));
        return React.createElement(
          TheadComponent,
          _extends({
            className: classnames('-filters', theadFilterProps.className),
            style: _extends({

              minWidth: rowMinWidth + 'px'
            }, theadFilterProps.style)
          }, theadFilterProps.rest),
          React.createElement(
            TrComponent,
            _extends({
              className: theadFilterTrProps.className,
              style: theadFilterTrProps.style
            }, theadFilterTrProps.rest),
            visibleColumns.map(makeFilter)
          )
        );
      };

      var makePageRow = function makePageRow(row, i) {
        var path = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];

        var rowInfo = {
          original: row[originalKey],
          row: row,
          index: row[indexKey],
          viewIndex: rowIndex += 1,
          pageSize: pageSize,
          page: page,
          level: path.length,
          nestingPath: path.concat([i]),
          aggregated: row[aggregatedKey],
          groupedByPivot: row[groupedByPivotKey],
          subRows: row[subRowsKey]
        };
        var isExpanded = _.get(expanded, rowInfo.nestingPath);
        var trGroupProps = getTrGroupProps(finalState, rowInfo, undefined, _this2);
        var trProps = _.splitProps(getTrProps(finalState, rowInfo, undefined, _this2));
        return React.createElement(
          TrGroupComponent,
          _extends({ key: rowInfo.nestingPath.join('_') }, trGroupProps),
          React.createElement(
            TrComponent,
            _extends({
              className: classnames(trProps.className, row._viewIndex % 2 ? '-even' : '-odd'),
              style: trProps.style
            }, trProps.rest),
            visibleColumns.map(function (column, i2) {
              var resizedCol = resized.find(function (x) {
                return x.id === column.id;
              }) || {};
              var show = typeof column.show === 'function' ? column.show() : column.show;
              var width = _.getFirstDefined(resizedCol.value, column.width, column.minWidth);
              var maxWidth = _.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
              var tdProps = _.splitProps(getTdProps(finalState, rowInfo, column, _this2));
              var columnProps = _.splitProps(column.getProps(finalState, rowInfo, column, _this2));

              var classes = [tdProps.className, column.className, columnProps.className];

              var styles = _extends({}, tdProps.style, column.style, columnProps.style);

              var cellInfo = _extends({}, rowInfo, {
                isExpanded: isExpanded,
                column: _extends({}, column),
                value: rowInfo.row[column.id],
                pivoted: column.pivoted,
                expander: column.expander,
                resized: resized,
                show: show,
                width: width,
                maxWidth: maxWidth,
                tdProps: tdProps,
                columnProps: columnProps,
                classes: classes,
                styles: styles
              });

              var value = cellInfo.value;

              var useOnExpanderClick = void 0;
              var isBranch = void 0;
              var isPreview = void 0;

              var onExpanderClick = function onExpanderClick(e) {
                var newExpanded = _.clone(expanded);
                if (isExpanded) {
                  newExpanded = _.set(newExpanded, cellInfo.nestingPath, false);
                } else {
                  newExpanded = _.set(newExpanded, cellInfo.nestingPath, {});
                }

                return _this2.setStateWithData({
                  expanded: newExpanded
                }, function () {
                  return onExpandedChange && onExpandedChange(newExpanded, cellInfo.nestingPath, e);
                });
              };

              // Default to a standard cell
              var resolvedCell = _.normalizeComponent(column.Cell, cellInfo, value);

              // Resolve Renderers
              var ResolvedAggregatedComponent = column.Aggregated || (!column.aggregate ? AggregatedComponent : column.Cell);
              var ResolvedExpanderComponent = column.Expander || ExpanderComponent;
              var ResolvedPivotValueComponent = column.PivotValue || PivotValueComponent;
              var DefaultResolvedPivotComponent = PivotComponent || function (props) {
                return React.createElement(
                  'div',
                  null,
                  React.createElement(ResolvedExpanderComponent, props),
                  React.createElement(ResolvedPivotValueComponent, props)
                );
              };
              var ResolvedPivotComponent = column.Pivot || DefaultResolvedPivotComponent;

              // Is this cell expandable?
              if (cellInfo.pivoted || cellInfo.expander) {
                // Make it expandable by defualt
                cellInfo.expandable = true;
                useOnExpanderClick = true;
                // If pivoted, has no subRows, and does not have a subComponent,
                // do not make expandable
                if (cellInfo.pivoted && !cellInfo.subRows && !SubComponent) {
                  cellInfo.expandable = false;
                }
              }

              if (cellInfo.pivoted) {
                // Is this column a branch?
                isBranch = rowInfo.row[pivotIDKey] === column.id && cellInfo.subRows;
                // Should this column be blank?
                isPreview = pivotBy.indexOf(column.id) > pivotBy.indexOf(rowInfo.row[pivotIDKey]) && cellInfo.subRows;
                // Pivot Cell Render Override
                if (isBranch) {
                  // isPivot
                  resolvedCell = _.normalizeComponent(ResolvedPivotComponent, _extends({}, cellInfo, {
                    value: row[pivotValKey]
                  }), row[pivotValKey]);
                } else if (isPreview) {
                  // Show the pivot preview
                  resolvedCell = _.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
                } else {
                  resolvedCell = null;
                }
              } else if (cellInfo.aggregated) {
                resolvedCell = _.normalizeComponent(ResolvedAggregatedComponent, cellInfo, value);
              }

              if (cellInfo.expander) {
                resolvedCell = _.normalizeComponent(ResolvedExpanderComponent, cellInfo, row[pivotValKey]);
                if (pivotBy) {
                  if (cellInfo.groupedByPivot) {
                    resolvedCell = null;
                  }
                  if (!cellInfo.subRows && !SubComponent) {
                    resolvedCell = null;
                  }
                }
              }

              var resolvedOnExpanderClick = useOnExpanderClick ? onExpanderClick : function () {};

              // If there are multiple onClick events, make sure they don't
              // override eachother. This should maybe be expanded to handle all
              // function attributes
              var interactionProps = {
                onClick: resolvedOnExpanderClick
              };

              if (tdProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  tdProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              if (columnProps.rest.onClick) {
                interactionProps.onClick = function (e) {
                  columnProps.rest.onClick(e, function () {
                    return resolvedOnExpanderClick(e);
                  });
                };
              }

              // Return the cell
              return React.createElement(
                TdComponent
                // eslint-disable-next-line react/no-array-index-key
                ,
                _extends({ key: i2 + '-' + column.id,
                  className: classnames(classes, !cellInfo.expandable && !show && 'hidden', cellInfo.expandable && 'rt-expandable', (isBranch || isPreview) && 'rt-pivot'),
                  style: _extends({}, styles, {
                    flex: width + ' 0 auto',
                    width: _.asPx(width),
                    maxWidth: _.asPx(maxWidth)
                  })
                }, tdProps.rest, columnProps.rest, interactionProps),
                resolvedCell
              );
            })
          ),
          rowInfo.subRows && isExpanded && rowInfo.subRows.map(function (d, i) {
            return makePageRow(d, i, rowInfo.nestingPath);
          }),
          SubComponent && !rowInfo.subRows && isExpanded && SubComponent(rowInfo, function () {
            var newExpanded = _.clone(expanded);

            _.set(newExpanded, cellInfo.nestingPath, false);
          })
        );
      };

      var makePadColumn = function makePadColumn(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var flex = width;
        var maxWidth = _.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tdProps = _.splitProps(getTdProps(finalState, undefined, column, _this2));
        var columnProps = _.splitProps(column.getProps(finalState, undefined, column, _this2));

        var classes = [tdProps.className, column.className, columnProps.className];

        var styles = _extends({}, tdProps.style, column.style, columnProps.style);

        return React.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: flex + ' 0 auto',
              width: _.asPx(width),
              maxWidth: _.asPx(maxWidth)
            })
          }, tdProps.rest),
          _.normalizeComponent(PadRowComponent)
        );
      };

      var makePadRow = function makePadRow(row, i) {
        var trGroupProps = getTrGroupProps(finalState, undefined, undefined, _this2);
        var trProps = _.splitProps(getTrProps(finalState, undefined, undefined, _this2));
        return React.createElement(
          TrGroupComponent,
          _extends({ key: 'pad-' + i }, trGroupProps),
          React.createElement(
            TrComponent,
            {
              className: classnames('-padRow', (pageRows.length + i) % 2 ? '-even' : '-odd', trProps.className),
              style: trProps.style || {}
            },
            visibleColumns.map(makePadColumn)
          )
        );
      };

      var makeColumnFooter = function makeColumnFooter(column, i) {
        var resizedCol = resized.find(function (x) {
          return x.id === column.id;
        }) || {};
        var show = typeof column.show === 'function' ? column.show() : column.show;
        var width = _.getFirstDefined(resizedCol.value, column.width, column.minWidth);
        var maxWidth = _.getFirstDefined(resizedCol.value, column.width, column.maxWidth);
        var tFootTdProps = _.splitProps(getTfootTdProps(finalState, undefined, undefined, _this2));
        var columnProps = _.splitProps(column.getProps(finalState, undefined, column, _this2));
        var columnFooterProps = _.splitProps(column.getFooterProps(finalState, undefined, column, _this2));

        var classes = [tFootTdProps.className, column.className, columnProps.className, columnFooterProps.className];

        var styles = _extends({}, tFootTdProps.style, column.style, columnProps.style, columnFooterProps.style);

        return React.createElement(
          TdComponent,
          _extends({
            key: i + '-' + column.id,
            className: classnames(classes, !show && 'hidden'),
            style: _extends({}, styles, {
              flex: width + ' 0 auto',
              width: _.asPx(width),
              maxWidth: _.asPx(maxWidth)
            })
          }, columnProps.rest, tFootTdProps.rest, columnFooterProps.rest),
          _.normalizeComponent(column.Footer, {
            data: sortedData,
            column: column
          })
        );
      };

      var makeColumnFooters = function makeColumnFooters() {
        var tFootProps = _.splitProps(getTfootProps(finalState, undefined, undefined, _this2));
        var tFootTrProps = _.splitProps(getTfootTrProps(finalState, undefined, undefined, _this2));
        return React.createElement(
          TfootComponent,
          _extends({
            className: tFootProps.className,
            style: _extends({

              minWidth: rowMinWidth + 'px'
            }, tFootProps.style)
          }, tFootProps.rest),
          React.createElement(
            TrComponent,
            _extends({
              className: classnames(tFootTrProps.className),
              style: tFootTrProps.style
            }, tFootTrProps.rest),
            visibleColumns.map(makeColumnFooter)
          )
        );
      };

      var makePagination = function makePagination(isTop) {
        var paginationProps = _.splitProps(getPaginationProps(finalState, undefined, undefined, _this2));
        return React.createElement(PaginationComponent, _extends({}, resolvedState, {
          pages: pages,
          canPrevious: canPrevious,
          canNext: canNext,
          onPageChange: _this2.onPageChange,
          onPageSizeChange: _this2.onPageSizeChange,
          className: paginationProps.className,
          style: paginationProps.style,
          isTop: isTop
        }, paginationProps.rest));
      };

      var makeTable = function makeTable() {
        return React.createElement(
          'div',
          _extends({
            className: classnames('ReactTable', className, rootProps.className),
            style: _extends({}, style, rootProps.style)
          }, rootProps.rest),
          showPagination && showPaginationTop ? React.createElement(
            'div',
            { className: 'pagination-top' },
            makePagination(true)
          ) : null,
          React.createElement(
            TableComponent,
            _extends({
              className: classnames(tableProps.className, currentlyResizing ? 'rt-resizing' : ''),
              style: tableProps.style
            }, tableProps.rest),
            hasHeaderGroups ? headerGroups.map(makeHeaderGroups) : null,
            makeHeaders(),
            hasFilters ? makeFilters() : null,
            React.createElement(
              TbodyComponent,
              _extends({
                className: classnames(tBodyProps.className),
                style: _extends({
                  minWidth: rowMinWidth + 'px'
                }, tBodyProps.style)
              }, tBodyProps.rest),
              pageRows.map(function (d, i) {
                return makePageRow(d, i);
              }),
              padRows.map(makePadRow)
            ),
            hasColumnFooter ? makeColumnFooters() : null
          ),
          showPagination && showPaginationBottom ? React.createElement(
            'div',
            { className: 'pagination-bottom' },
            makePagination(false)
          ) : null,
          !pageRows.length && React.createElement(
            NoDataComponent,
            noDataProps,
            _.normalizeComponent(noDataText)
          ),
          React.createElement(LoadingComponent, _extends({ loading: loading, loadingText: loadingText }, loadingProps))
        );
      };

      // childProps are optionally passed to a function-as-a-child
      return children ? children(finalState, makeTable, this) : makeTable();
    }
  }]);

  return ReactTable;
}(Methods(Lifecycle(Component)));

ReactTable.propTypes = propTypes;
ReactTable.defaultProps = defaultProps;
export default ReactTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIi4uL3NyYy9pbmRleC5qcyJdLCJuYW1lcyI6WyJSZWFjdCIsIkNvbXBvbmVudCIsImNsYXNzbmFtZXMiLCJfIiwiTGlmZWN5Y2xlIiwiTWV0aG9kcyIsImRlZmF1bHRQcm9wcyIsInByb3BUeXBlcyIsIlJlYWN0VGFibGVEZWZhdWx0cyIsIlJlYWN0VGFibGUiLCJwcm9wcyIsImdldFJlc29sdmVkU3RhdGUiLCJiaW5kIiwiZ2V0RGF0YU1vZGVsIiwiZ2V0U29ydGVkRGF0YSIsImZpcmVGZXRjaERhdGEiLCJnZXRQcm9wT3JTdGF0ZSIsImdldFN0YXRlT3JQcm9wIiwiZmlsdGVyRGF0YSIsInNvcnREYXRhIiwiZ2V0TWluUm93cyIsIm9uUGFnZUNoYW5nZSIsIm9uUGFnZVNpemVDaGFuZ2UiLCJzb3J0Q29sdW1uIiwiZmlsdGVyQ29sdW1uIiwicmVzaXplQ29sdW1uU3RhcnQiLCJyZXNpemVDb2x1bW5FbmQiLCJyZXNpemVDb2x1bW5Nb3ZpbmciLCJzdGF0ZSIsInBhZ2UiLCJkZWZhdWx0UGFnZSIsInBhZ2VTaXplIiwiZGVmYXVsdFBhZ2VTaXplIiwic29ydGVkIiwiZGVmYXVsdFNvcnRlZCIsImV4cGFuZGVkIiwiZGVmYXVsdEV4cGFuZGVkIiwiZmlsdGVyZWQiLCJkZWZhdWx0RmlsdGVyZWQiLCJyZXNpemVkIiwiZGVmYXVsdFJlc2l6ZWQiLCJjdXJyZW50bHlSZXNpemluZyIsInNraXBOZXh0U29ydCIsInJlc29sdmVkU3RhdGUiLCJjaGlsZHJlbiIsImNsYXNzTmFtZSIsInN0eWxlIiwiZ2V0UHJvcHMiLCJnZXRUYWJsZVByb3BzIiwiZ2V0VGhlYWRHcm91cFByb3BzIiwiZ2V0VGhlYWRHcm91cFRyUHJvcHMiLCJnZXRUaGVhZEdyb3VwVGhQcm9wcyIsImdldFRoZWFkUHJvcHMiLCJnZXRUaGVhZFRyUHJvcHMiLCJnZXRUaGVhZFRoUHJvcHMiLCJnZXRUaGVhZEZpbHRlclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUclByb3BzIiwiZ2V0VGhlYWRGaWx0ZXJUaFByb3BzIiwiZ2V0VGJvZHlQcm9wcyIsImdldFRyR3JvdXBQcm9wcyIsImdldFRyUHJvcHMiLCJnZXRUZFByb3BzIiwiZ2V0VGZvb3RQcm9wcyIsImdldFRmb290VHJQcm9wcyIsImdldFRmb290VGRQcm9wcyIsImdldFBhZ2luYXRpb25Qcm9wcyIsImdldExvYWRpbmdQcm9wcyIsImdldE5vRGF0YVByb3BzIiwiZ2V0UmVzaXplclByb3BzIiwic2hvd1BhZ2luYXRpb24iLCJzaG93UGFnaW5hdGlvblRvcCIsInNob3dQYWdpbmF0aW9uQm90dG9tIiwibWFudWFsIiwibG9hZGluZ1RleHQiLCJub0RhdGFUZXh0Iiwic29ydGFibGUiLCJtdWx0aVNvcnQiLCJyZXNpemFibGUiLCJmaWx0ZXJhYmxlIiwicGl2b3RJREtleSIsInBpdm90VmFsS2V5IiwicGl2b3RCeSIsInN1YlJvd3NLZXkiLCJhZ2dyZWdhdGVkS2V5Iiwib3JpZ2luYWxLZXkiLCJpbmRleEtleSIsImdyb3VwZWRCeVBpdm90S2V5IiwibG9hZGluZyIsInBhZ2VzIiwib25FeHBhbmRlZENoYW5nZSIsIlRhYmxlQ29tcG9uZW50IiwiVGhlYWRDb21wb25lbnQiLCJUYm9keUNvbXBvbmVudCIsIlRyR3JvdXBDb21wb25lbnQiLCJUckNvbXBvbmVudCIsIlRoQ29tcG9uZW50IiwiVGRDb21wb25lbnQiLCJUZm9vdENvbXBvbmVudCIsIlBhZ2luYXRpb25Db21wb25lbnQiLCJMb2FkaW5nQ29tcG9uZW50IiwiU3ViQ29tcG9uZW50IiwiTm9EYXRhQ29tcG9uZW50IiwiUmVzaXplckNvbXBvbmVudCIsIkV4cGFuZGVyQ29tcG9uZW50IiwiUGl2b3RWYWx1ZUNvbXBvbmVudCIsIlBpdm90Q29tcG9uZW50IiwiQWdncmVnYXRlZENvbXBvbmVudCIsIkZpbHRlckNvbXBvbmVudCIsIlBhZFJvd0NvbXBvbmVudCIsInJlc29sdmVkRGF0YSIsInZpc2libGVDb2x1bW5zIiwiaGVhZGVyR3JvdXBzIiwiaGFzSGVhZGVyR3JvdXBzIiwic29ydGVkRGF0YSIsInN0YXJ0Um93IiwiZW5kUm93IiwicGFnZVJvd3MiLCJzbGljZSIsIm1pblJvd3MiLCJwYWRSb3dzIiwicmFuZ2UiLCJNYXRoIiwibWF4IiwibGVuZ3RoIiwiaGFzQ29sdW1uRm9vdGVyIiwic29tZSIsImQiLCJGb290ZXIiLCJoYXNGaWx0ZXJzIiwicmVjdXJzZVJvd3NWaWV3SW5kZXgiLCJyb3dzIiwicGF0aCIsImluZGV4IiwibWFwIiwicm93IiwiaSIsInJvd1dpdGhWaWV3SW5kZXgiLCJfdmlld0luZGV4IiwibmV3UGF0aCIsImNvbmNhdCIsImdldCIsImNhblByZXZpb3VzIiwiY2FuTmV4dCIsInJvd01pbldpZHRoIiwic3VtIiwicmVzaXplZENvbHVtbiIsImZpbmQiLCJ4IiwiaWQiLCJnZXRGaXJzdERlZmluZWQiLCJ2YWx1ZSIsIndpZHRoIiwibWluV2lkdGgiLCJyb3dJbmRleCIsImZpbmFsU3RhdGUiLCJyb290UHJvcHMiLCJzcGxpdFByb3BzIiwidW5kZWZpbmVkIiwidGFibGVQcm9wcyIsInRCb2R5UHJvcHMiLCJsb2FkaW5nUHJvcHMiLCJub0RhdGFQcm9wcyIsIm1ha2VIZWFkZXJHcm91cCIsImNvbHVtbiIsInJlc2l6ZWRWYWx1ZSIsImNvbCIsImxlYWZDb2x1bW5zIiwibGVhdmVzIiwiZmxleCIsIm1heFdpZHRoIiwidGhlYWRHcm91cFRoUHJvcHMiLCJjb2x1bW5IZWFkZXJQcm9wcyIsImdldEhlYWRlclByb3BzIiwiY2xhc3NlcyIsImhlYWRlckNsYXNzTmFtZSIsInN0eWxlcyIsImhlYWRlclN0eWxlIiwicmVzdCIsImZsZXhTdHlsZXMiLCJhc1B4Iiwibm9ybWFsaXplQ29tcG9uZW50IiwiSGVhZGVyIiwiZGF0YSIsIm1ha2VIZWFkZXJHcm91cHMiLCJ0aGVhZEdyb3VwUHJvcHMiLCJ0aGVhZEdyb3VwVHJQcm9wcyIsIm1ha2VIZWFkZXIiLCJyZXNpemVkQ29sIiwic29ydCIsInNob3ciLCJ0aGVhZFRoUHJvcHMiLCJpc1Jlc2l6YWJsZSIsInJlc2l6ZXIiLCJlIiwiaXNTb3J0YWJsZSIsImRlc2MiLCJpbmNsdWRlcyIsInNoaWZ0S2V5IiwibWFrZUhlYWRlcnMiLCJ0aGVhZFByb3BzIiwidGhlYWRUclByb3BzIiwibWFrZUZpbHRlciIsInRoZWFkRmlsdGVyVGhQcm9wcyIsImZpbHRlciIsIlJlc29sdmVkRmlsdGVyQ29tcG9uZW50IiwiRmlsdGVyIiwiaXNGaWx0ZXJhYmxlIiwib25DaGFuZ2UiLCJtYWtlRmlsdGVycyIsInRoZWFkRmlsdGVyUHJvcHMiLCJ0aGVhZEZpbHRlclRyUHJvcHMiLCJtYWtlUGFnZVJvdyIsInJvd0luZm8iLCJvcmlnaW5hbCIsInZpZXdJbmRleCIsImxldmVsIiwibmVzdGluZ1BhdGgiLCJhZ2dyZWdhdGVkIiwiZ3JvdXBlZEJ5UGl2b3QiLCJzdWJSb3dzIiwiaXNFeHBhbmRlZCIsInRyR3JvdXBQcm9wcyIsInRyUHJvcHMiLCJqb2luIiwiaTIiLCJ0ZFByb3BzIiwiY29sdW1uUHJvcHMiLCJjZWxsSW5mbyIsInBpdm90ZWQiLCJleHBhbmRlciIsInVzZU9uRXhwYW5kZXJDbGljayIsImlzQnJhbmNoIiwiaXNQcmV2aWV3Iiwib25FeHBhbmRlckNsaWNrIiwibmV3RXhwYW5kZWQiLCJjbG9uZSIsInNldCIsInNldFN0YXRlV2l0aERhdGEiLCJyZXNvbHZlZENlbGwiLCJDZWxsIiwiUmVzb2x2ZWRBZ2dyZWdhdGVkQ29tcG9uZW50IiwiQWdncmVnYXRlZCIsImFnZ3JlZ2F0ZSIsIlJlc29sdmVkRXhwYW5kZXJDb21wb25lbnQiLCJFeHBhbmRlciIsIlJlc29sdmVkUGl2b3RWYWx1ZUNvbXBvbmVudCIsIlBpdm90VmFsdWUiLCJEZWZhdWx0UmVzb2x2ZWRQaXZvdENvbXBvbmVudCIsIlJlc29sdmVkUGl2b3RDb21wb25lbnQiLCJQaXZvdCIsImV4cGFuZGFibGUiLCJpbmRleE9mIiwicmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2siLCJpbnRlcmFjdGlvblByb3BzIiwib25DbGljayIsIm1ha2VQYWRDb2x1bW4iLCJtYWtlUGFkUm93IiwibWFrZUNvbHVtbkZvb3RlciIsInRGb290VGRQcm9wcyIsImNvbHVtbkZvb3RlclByb3BzIiwiZ2V0Rm9vdGVyUHJvcHMiLCJtYWtlQ29sdW1uRm9vdGVycyIsInRGb290UHJvcHMiLCJ0Rm9vdFRyUHJvcHMiLCJtYWtlUGFnaW5hdGlvbiIsImlzVG9wIiwicGFnaW5hdGlvblByb3BzIiwibWFrZVRhYmxlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFBQSxPQUFPQSxLQUFQLElBQWdCQyxTQUFoQixRQUFpQyxPQUFqQztBQUNBLE9BQU9DLFVBQVAsTUFBdUIsWUFBdkI7QUFDQTtBQUNBLE9BQU9DLENBQVAsTUFBYyxTQUFkO0FBQ0EsT0FBT0MsU0FBUCxNQUFzQixhQUF0QjtBQUNBLE9BQU9DLE9BQVAsTUFBb0IsV0FBcEI7QUFDQSxPQUFPQyxZQUFQLE1BQXlCLGdCQUF6QjtBQUNBLE9BQU9DLFNBQVAsTUFBc0IsYUFBdEI7O0FBRUEsT0FBTyxJQUFNQyxxQkFBcUJGLFlBQTNCOztJQUVjRyxVOzs7QUFJbkIsc0JBQWFDLEtBQWIsRUFBb0I7QUFBQTs7QUFBQTs7QUFHbEIsVUFBS0MsZ0JBQUwsR0FBd0IsTUFBS0EsZ0JBQUwsQ0FBc0JDLElBQXRCLE9BQXhCO0FBQ0EsVUFBS0MsWUFBTCxHQUFvQixNQUFLQSxZQUFMLENBQWtCRCxJQUFsQixPQUFwQjtBQUNBLFVBQUtFLGFBQUwsR0FBcUIsTUFBS0EsYUFBTCxDQUFtQkYsSUFBbkIsT0FBckI7QUFDQSxVQUFLRyxhQUFMLEdBQXFCLE1BQUtBLGFBQUwsQ0FBbUJILElBQW5CLE9BQXJCO0FBQ0EsVUFBS0ksY0FBTCxHQUFzQixNQUFLQSxjQUFMLENBQW9CSixJQUFwQixPQUF0QjtBQUNBLFVBQUtLLGNBQUwsR0FBc0IsTUFBS0EsY0FBTCxDQUFvQkwsSUFBcEIsT0FBdEI7QUFDQSxVQUFLTSxVQUFMLEdBQWtCLE1BQUtBLFVBQUwsQ0FBZ0JOLElBQWhCLE9BQWxCO0FBQ0EsVUFBS08sUUFBTCxHQUFnQixNQUFLQSxRQUFMLENBQWNQLElBQWQs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O0FBQXBDLFdBREQsR0FFRyxJQWxDTjtBQW1DRyxXQUFDcEosU0FBU08sTUFBVixJQUNDO0FBQUMsMkJBQUQ7QUFBcUJzQyx1QkFBckI7QUFBbUM5SixjQUFFaUwsa0JBQUYsQ0FBcUIxRyxVQUFyQjtBQUFuQyxXQXBDSjtBQXNDRSw4QkFBQyxnQkFBRCxhQUFrQixTQUFTYSxPQUEzQixFQUFvQyxhQUFhZCxXQUFqRCxJQUFrRXVGLFlBQWxFO0FBdENGLFNBREY7QUEwQ0QsT0EzQ0Q7O0FBNkNBO0FBQ0EsYUFBT3BILFdBQVdBLFNBQVM4RyxVQUFULEVBQXFCaUgsU0FBckIsRUFBZ0MsSUFBaEMsQ0FBWCxHQUFtREEsV0FBMUQ7QUFDRDs7OztFQTkxQnFDdFEsUUFBUUQsVUFBVUgsU0FBVixDQUFSLEM7O0FBQW5CUSxVLENBQ1pGLFMsR0FBWUEsUztBQURBRSxVLENBRVpILFksR0FBZUEsWTtlQUZIRyxVIiwiZmlsZSI6ImluZGV4LmpzIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IFJlYWN0LCB7IENvbXBvbmVudCB9IGZyb20gJ3JlYWN0J1xuaW1wb3J0IGNsYXNzbmFtZXMgZnJvbSAnY2xhc3NuYW1lcydcbi8vXG5pbXBvcnQgXyBmcm9tICcuL3V0aWxzJ1xuaW1wb3J0IExpZmVjeWNsZSBmcm9tICcuL2xpZmVjeWNsZSdcbmltcG9ydCBNZXRob2RzIGZyb20gJy4vbWV0aG9kcydcbmltcG9ydCBkZWZhdWx0UHJvcHMgZnJvbSAnLi9kZWZhdWx0UHJvcHMnXG5pbXBvcnQgcHJvcFR5cGVzIGZyb20gJy4vcHJvcFR5cGVzJ1xuXG5leHBvcnQgY29uc3QgUmVhY3RUYWJsZURlZmF1bHRzID0gZGVmYXVsdFByb3BzXG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFJlYWN0VGFibGUgZXh0ZW5kcyBNZXRob2RzKExpZmVjeWNsZShDb21wb25lbnQpKSB7XG4gIHN0YXRpYyBwcm9wVHlwZXMgPSBwcm9wVHlwZXNcbiAgc3RhdGljIGRlZmF1bHRQcm9wcyA9IGRlZmF1bHRQcm9wc1xuXG4gIGNvbnN0cnVjdG9yIChwcm9wcykge1xuICAgIHN1cGVyKClcblxuICAgIHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZS5iaW5kKHRoaXMpXG4gICAgdGhpcy5nZXREYXRhTW9kZWwgPSB0aGlzLmdldERhdGFNb2RlbC5iaW5kKHRoaXMpXG4gICAgdGhpcy5nZXRTb3J0ZWREYXRhID0gdGhpcy5nZXRTb3J0ZWREYXRhLmJpbmQodGhpcylcbiAgICB0aGlzLmZpcmVGZXRjaERhdGEgPSB0aGlzLmZpcmVGZXRjaERhdGEuYmluZCh0aGlzKVxuICAgIHRoaXMuZ2V0UHJvcE9yU3RhdGUgPSB0aGlzLmdldFByb3BPclN0YXRlLmJpbmQodGhpcylcbiAgICB0aGlzLmdldFN0YXRlT3JQcm9wID0gdGhpcy5nZXRTdGF0ZU9yUHJvcC5iaW5kKHRoaXMpXG4gICAgdGhpcy5maWx0ZXJEYXRhID0gdGhpcy5maWx0ZXJEYXRhLmJpbmQodGhpcylcbiAgICB0aGlzLnNvcnREYXRhID0gdGhpcy5zb3J0RGF0YS5iaW5kKHRoaXMpXG4gICAgdGhpcy5nZXRNaW5Sb3dzID0gdGhpcy5nZXRNaW5Sb3dzLmJpbmQodGhpcylcbiAgICB0aGlzLm9uUGFnZUNoYW5nZSA9IHRoaXMub25QYWdlQ2hhbmdlLmJpbmQodGhpcylcbiAgICB0aGlzLm9uUGFnZVNpemVDaGFuZ2UgPSB0aGlzLm9uUGFnZVNpemVDaGFuZ2UuYmluZCh0aGlzKVxuICAgIHRoaXMuc29ydENvbHVtbiA9IHRoaXMuc29ydENvbHVtbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5maWx0ZXJDb2x1bW4gPSB0aGlzLmZpbHRlckNvbHVtbi5iaW5kKHRoaXMpXG4gICAgdGhpcy5yZXNpemVDb2x1bW5TdGFydCA9IHRoaXMucmVzaXplQ29sdW1uU3RhcnQuYmluZCh0aGlzKVxuICAgIHRoaXMucmVzaXplQ29sdW1uRW5kID0gdGhpcy5yZXNpemVDb2x1bW5FbmQuYmluZCh0aGlzKVxuICAgIHRoaXMucmVzaXplQ29sdW1uTW92aW5nID0gdGhpcy5yZXNpemVDb2x1bW5Nb3ZpbmcuYmluZCh0aGlzKVxuXG4gICAgdGhpcy5zdGF0ZSA9IHtcbiAgICAgIHBhZ2U6IHByb3BzLmRlZmF1bHRQYWdlLFxuICAgICAgcGFnZVNpemU6IHByb3BzLmRlZmF1bHRQYWdlU2l6ZSxcbiAgICAgIHNvcnRlZDogcHJvcHMuZGVmYXVsdFNvcnRlZCxcbiAgICAgIGV4cGFuZGVkOiBwcm9wcy5kZWZhdWx0RXhwYW5kZWQsXG4gICAgICBmaWx0ZXJlZDogcHJvcHMuZGVmYXVsdEZpbHRlcmVkLFxuICAgICAgcmVzaXplZDogcHJvcHMuZGVmYXVsdFJlc2l6ZWQsXG4gICAgICBjdXJyZW50bHlSZXNpemluZzogZmFsc2UsXG4gICAgICBza2lwTmV4dFNvcnQ6IGZhbHNlLFxuICAgIH1cbiAgfVxuXG4gIHJlbmRlciAoKSB7XG4gICAgY29uc3QgcmVzb2x2ZWRTdGF0ZSA9IHRoaXMuZ2V0UmVzb2x2ZWRTdGF0ZSgpXG4gICAgY29uc3Qge1xuICAgICAgY2hpbGRyZW4sXG4gICAgICBjbGFzc05hbWUsXG4gICAgICBzdHlsZSxcbiAgICAgIGdldFByb3BzLFxuICAgICAgZ2V0VGFibGVQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBQcm9wcyxcbiAgICAgIGdldFRoZWFkR3JvdXBUclByb3BzLFxuICAgICAgZ2V0VGhlYWRHcm91cFRoUHJvcHMsXG4gICAgICBnZXRUaGVhZFByb3BzLFxuICAgICAgZ2V0VGhlYWRUclByb3BzLFxuICAgICAgZ2V0VGhlYWRUaFByb3BzLFxuICAgICAgZ2V0VGhlYWRGaWx0ZXJQcm9wcyxcbiAgICAgIGdldFRoZWFkRmlsdGVyVHJQcm9wcyxcbiAgICAgIGdldFRoZWFkRmlsdGVyVGhQcm9wcyxcbiAgICAgIGdldFRib2R5UHJvcHMsXG4gICAgICBnZXRUckdyb3VwUHJvcHMsXG4gICAgICBnZXRUclByb3BzLFxuICAgICAgZ2V0VGRQcm9wcyxcbiAgICAgIGdldFRmb290UHJvcHMsXG4gICAgICBnZXRUZm9vdFRyUHJvcHMsXG4gICAgICBnZXRUZm9vdFRkUHJvcHMsXG4gICAgICBnZXRQYWdpbmF0aW9uUHJvcHMsXG4gICAgICBnZXRMb2FkaW5nUHJvcHMsXG4gICAgICBnZXROb0RhdGFQcm9wcyxcbiAgICAgIGdldFJlc2l6ZXJQcm9wcyxcbiAgICAgIHNob3dQYWdpbmF0aW9uLFxuICAgICAgc2hvd1BhZ2luYXRpb25Ub3AsXG4gICAgICBzaG93UGFnaW5hdGlvbkJvdHRvbSxcbiAgICAgIG1hbnVhbCxcbiAgICAgIGxvYWRpbmdUZXh0LFxuICAgICAgbm9EYXRhVGV4dCxcbiAgICAgIHNvcnRhYmxlLFxuICAgICAgbXVsdGlTb3J0LFxuICAgICAgcmVzaXphYmxlLFxuICAgICAgZmlsdGVyYWJsZSxcbiAgICAgIC8vIFBpdm90aW5nIFN0YXRlXG4gICAgICBwaXZvdElES2V5LFxuICAgICAgcGl2b3RWYWxLZXksXG4gICAgICBwaXZvdEJ5LFxuICAgICAgc3ViUm93c0tleSxcbiAgICAgIGFnZ3JlZ2F0ZWRLZXksXG4gICAgICBvcmlnaW5hbEtleSxcbiAgICAgIGluZGV4S2V5LFxuICAgICAgZ3JvdXBlZEJ5UGl2b3RLZXksXG4gICAgICAvLyBTdGF0ZVxuICAgICAgbG9hZGluZyxcbiAgICAgIHBhZ2VTaXplLFxuICAgICAgcGFnZSxcbiAgICAgIHNvcnRlZCxcbiAgICAgIGZpbHRlcmVkLFxuICAgICAgcmVzaXplZCxcbiAgICAgIGV4cGFuZGVkLFxuICAgICAgcGFnZXMsXG4gICAgICBvbkV4cGFuZGVkQ2hhbmdlLFxuICAgICAgLy8gQ29tcG9uZW50c1xuICAgICAgVGFibGVDb21wb25lbnQsXG4gICAgICBUaGVhZENvbXBvbmVudCxcbiAgICAgIFRib2R5Q29tcG9uZW50LFxuICAgICAgVHJHcm91cENvbXBvbmVudCxcbiAgICAgIFRyQ29tcG9uZW50LFxuICAgICAgVGhDb21wb25lbnQsXG4gICAgICBUZENvbXBvbmVudCxcbiAgICAgIFRmb290Q29tcG9uZW50LFxuICAgICAgUGFnaW5hdGlvbkNvbXBvbmVudCxcbiAgICAgIExvYWRpbmdDb21wb25lbnQsXG4gICAgICBTdWJDb21wb25lbnQsXG4gICAgICBOb0RhdGFDb21wb25lbnQsXG4gICAgICBSZXNpemVyQ29tcG9uZW50LFxuICAgICAgRXhwYW5kZXJDb21wb25lbnQsXG4gICAgICBQaXZvdFZhbHVlQ29tcG9uZW50LFxuICAgICAgUGl2b3RDb21wb25lbnQsXG4gICAgICBBZ2dyZWdhdGVkQ29tcG9uZW50LFxuICAgICAgRmlsdGVyQ29tcG9uZW50LFxuICAgICAgUGFkUm93Q29tcG9uZW50LFxuICAgICAgLy8gRGF0YSBtb2RlbFxuICAgICAgcmVzb2x2ZWREYXRhLFxuICAgICAgdmlzaWJsZUNvbHVtbnMsXG4gICAgICBoZWFkZXJHcm91cHMsXG4gICAgICBoYXNIZWFkZXJHcm91cHMsXG4gICAgICAvLyBTb3J0ZWQgRGF0YVxuICAgICAgc29ydGVkRGF0YSxcbiAgICAgIGN1cnJlbnRseVJlc2l6aW5nLFxuICAgIH0gPSByZXNvbHZlZFN0YXRlXG5cbiAgICAvLyBQYWdpbmF0aW9uXG4gICAgY29uc3Qgc3RhcnRSb3cgPSBwYWdlU2l6ZSAqIHBhZ2VcbiAgICBjb25zdCBlbmRSb3cgPSBzdGFydFJvdyArIHBhZ2VTaXplXG4gICAgbGV0IHBhZ2VSb3dzID0gbWFudWFsID8gcmVzb2x2ZWREYXRhIDogc29ydGVkRGF0YS5zbGljZShzdGFydFJvdywgZW5kUm93KVxuICAgIGNvbnN0IG1pblJvd3MgPSB0aGlzLmdldE1pblJvd3MoKVxuICAgIGNvbnN0IHBhZFJvd3MgPSBfLnJhbmdlKE1hdGgubWF4KG1pblJvd3MgLSBwYWdlUm93cy5sZW5ndGgsIDApKVxuXG4gICAgY29uc3QgaGFzQ29sdW1uRm9vdGVyID0gdmlzaWJsZUNvbHVtbnMuc29tZShkID0+IGQuRm9vdGVyKVxuICAgIGNvbnN0IGhhc0ZpbHRlcnMgPSBmaWx0ZXJhYmxlIHx8IHZpc2libGVDb2x1bW5zLnNvbWUoZCA9PiBkLmZpbHRlcmFibGUpXG5cbiAgICBjb25zdCByZWN1cnNlUm93c1ZpZXdJbmRleCA9IChyb3dzLCBwYXRoID0gW10sIGluZGV4ID0gLTEpID0+IFtcbiAgICAgIHJvd3MubWFwKChyb3csIGkpID0+IHtcbiAgICAgICAgaW5kZXggKz0gMVxuICAgICAgICBjb25zdCByb3dXaXRoVmlld0luZGV4ID0ge1xuICAgICAgICAgIC4uLnJvdyxcbiAgICAgICAgICBfdmlld0luZGV4OiBpbmRleCxcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBuZXdQYXRoID0gcGF0aC5jb25jYXQoW2ldKVxuICAgICAgICBpZiAocm93V2l0aFZpZXdJbmRleFtzdWJSb3dzS2V5XSAmJiBfLmdldChleHBhbmRlZCwgbmV3UGF0aCkpIHtcbiAgICAgICAgICBbcm93V2l0aFZpZXdJbmRleFtzdWJSb3dzS2V5XSwgaW5kZXhdID0gcmVjdXJzZVJvd3NWaWV3SW5kZXgoXG4gICAgICAgICAgICByb3dXaXRoVmlld0luZGV4W3N1YlJvd3NLZXldLFxuICAgICAgICAgICAgbmV3UGF0aCxcbiAgICAgICAgICAgIGluZGV4XG4gICAgICAgICAgKVxuICAgICAgICB9XG4gICAgICAgIHJldHVybiByb3dXaXRoVmlld0luZGV4XG4gICAgICB9KSxcbiAgICAgIGluZGV4LFxuICAgIF07XG4gICAgW3BhZ2VSb3dzXSA9IHJlY3Vyc2VSb3dzVmlld0luZGV4KHBhZ2VSb3dzKVxuXG4gICAgY29uc3QgY2FuUHJldmlvdXMgPSBwYWdlID4gMFxuICAgIGNvbnN0IGNhbk5leHQgPSBwYWdlICsgMSA8IHBhZ2VzXG5cbiAgICBjb25zdCByb3dNaW5XaWR0aCA9IF8uc3VtKFxuICAgICAgdmlzaWJsZUNvbHVtbnMubWFwKGQgPT4ge1xuICAgICAgICBjb25zdCByZXNpemVkQ29sdW1uID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gZC5pZCkgfHwge31cbiAgICAgICAgcmV0dXJuIF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2x1bW4udmFsdWUsIGQud2lkdGgsIGQubWluV2lkdGgpXG4gICAgICB9KVxuICAgIClcblxuICAgIGxldCByb3dJbmRleCA9IC0xXG5cbiAgICBjb25zdCBmaW5hbFN0YXRlID0ge1xuICAgICAgLi4ucmVzb2x2ZWRTdGF0ZSxcbiAgICAgIHN0YXJ0Um93LFxuICAgICAgZW5kUm93LFxuICAgICAgcGFnZVJvd3MsXG4gICAgICBtaW5Sb3dzLFxuICAgICAgcGFkUm93cyxcbiAgICAgIGhhc0NvbHVtbkZvb3RlcixcbiAgICAgIGNhblByZXZpb3VzLFxuICAgICAgY2FuTmV4dCxcbiAgICAgIHJvd01pbldpZHRoLFxuICAgIH1cblxuICAgIGNvbnN0IHJvb3RQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgY29uc3QgdGFibGVQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUYWJsZVByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICBjb25zdCB0Qm9keVByb3BzID0gXy5zcGxpdFByb3BzKGdldFRib2R5UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgIGNvbnN0IGxvYWRpbmdQcm9wcyA9IGdldExvYWRpbmdQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcbiAgICBjb25zdCBub0RhdGFQcm9wcyA9IGdldE5vRGF0YVByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuXG4gICAgLy8gVmlzdWFsIENvbXBvbmVudHNcblxuICAgIGNvbnN0IG1ha2VIZWFkZXJHcm91cCA9IChjb2x1bW4sIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlc2l6ZWRWYWx1ZSA9IGNvbCA9PiAocmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sLmlkKSB8fCB7fSkudmFsdWVcblxuICAgICAgY29uc3QgbGVhZkNvbHVtbnMgPSBfLmxlYXZlcyhjb2x1bW4sICdjb2x1bW5zJylcbiAgICAgIGNvbnN0IGZsZXggPSBfLnN1bShcbiAgICAgICAgbGVhZkNvbHVtbnMubWFwKGNvbCA9PiAoY29sLndpZHRoIHx8IHJlc2l6ZWRWYWx1ZShjb2wpID8gMCA6IGNvbC5taW5XaWR0aCkpXG4gICAgICApXG4gICAgICBjb25zdCB3aWR0aCA9IF8uc3VtKFxuICAgICAgICBsZWFmQ29sdW1ucy5tYXAoY29sID0+IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRWYWx1ZShjb2wpLCBjb2wud2lkdGgsIGNvbC5taW5XaWR0aCkpXG4gICAgICApXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uc3VtKFxuICAgICAgICBsZWFmQ29sdW1ucy5tYXAoY29sID0+IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRWYWx1ZShjb2wpLCBjb2wud2lkdGgsIGNvbC5tYXhXaWR0aCkpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBUaFByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEdyb3VwVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcylcbiAgICAgIClcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICAgIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsXG4gICAgICAgIHRoZWFkR3JvdXBUaFByb3BzLmNsYXNzTmFtZSxcbiAgICAgICAgY29sdW1uSGVhZGVyUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgXVxuXG4gICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgIC4uLmNvbHVtbi5oZWFkZXJTdHlsZSxcbiAgICAgICAgLi4udGhlYWRHcm91cFRoUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbkhlYWRlclByb3BzLnN0eWxlLFxuICAgICAgfVxuXG4gICAgICBjb25zdCByZXN0ID0ge1xuICAgICAgICAuLi50aGVhZEdyb3VwVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmbGV4U3R5bGVzID0ge1xuICAgICAgICBmbGV4OiBgJHtmbGV4fSAwIGF1dG9gLFxuICAgICAgICB3aWR0aDogXy5hc1B4KHdpZHRoKSxcbiAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXG4gICAgICB9XG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3Nlcyl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgIC4uLmZsZXhTdHlsZXMsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIHtfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uSGVhZGVyLCB7XG4gICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgY29sdW1uLFxuICAgICAgICAgIH0pfVxuICAgICAgICA8L1RoQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VIZWFkZXJHcm91cHMgPSAocm93LCBpKSA9PiB7XG4gICAgICBjb25zdCB0aGVhZEdyb3VwUHJvcHMgPSBfLnNwbGl0UHJvcHMoXG4gICAgICAgIGdldFRoZWFkR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHJvdywgdGhpcylcbiAgICAgIClcbiAgICAgIGNvbnN0IHRoZWFkR3JvdXBUclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEdyb3VwVHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHJvdywgdGhpcylcbiAgICAgIClcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVhZENvbXBvbmVudFxuICAgICAgICAgIGtleT17YCR7aX0tJHtyb3cuaWR9YH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1oZWFkZXJHcm91cHMnLCB0aGVhZEdyb3VwUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgLFxuICAgICAgICAgICAgLi4udGhlYWRHcm91cFByb3BzLnN0eWxlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnRoZWFkR3JvdXBQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAgPFRyQ29tcG9uZW50XG4gICAgICAgICAgICBjbGFzc05hbWU9e3RoZWFkR3JvdXBUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZEdyb3VwVHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50aGVhZEdyb3VwVHJQcm9wcy5yZXN0fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHtyb3cubWFwKG1ha2VIZWFkZXJHcm91cCl9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9UaGVhZENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGVyID0gKGNvbHVtbiwgaSkgPT4ge1xuICAgICAgY29uc3QgcmVzaXplZENvbCA9IHJlc2l6ZWQuZmluZCh4ID0+IHguaWQgPT09IGNvbHVtbi5pZCkgfHwge31cbiAgICAgIGNvbnN0IHNvcnQgPSBzb3J0ZWQuZmluZChkID0+IGQuaWQgPT09IGNvbHVtbi5pZClcbiAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcbiAgICAgIGNvbnN0IHdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWluV2lkdGgpXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgY29uc3QgdGhlYWRUaFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRoZWFkVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICBjb25zdCBjb2x1bW5IZWFkZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhcbiAgICAgICAgY29sdW1uLmdldEhlYWRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjbGFzc2VzID0gW2NvbHVtbi5oZWFkZXJDbGFzc05hbWUsIHRoZWFkVGhQcm9wcy5jbGFzc05hbWUsIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZV1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXG4gICAgICAgIC4uLnRoZWFkVGhQcm9wcy5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGUsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxuICAgICAgfVxuXG4gICAgICBjb25zdCBpc1Jlc2l6YWJsZSA9IF8uZ2V0Rmlyc3REZWZpbmVkKGNvbHVtbi5yZXNpemFibGUsIHJlc2l6YWJsZSwgZmFsc2UpXG4gICAgICBjb25zdCByZXNpemVyID0gaXNSZXNpemFibGUgPyAoXG4gICAgICAgIDxSZXNpemVyQ29tcG9uZW50XG4gICAgICAgICAgb25Nb3VzZURvd249e2UgPT4gdGhpcy5yZXNpemVDb2x1bW5TdGFydChlLCBjb2x1bW4sIGZhbHNlKX1cbiAgICAgICAgICBvblRvdWNoU3RhcnQ9e2UgPT4gdGhpcy5yZXNpemVDb2x1bW5TdGFydChlLCBjb2x1bW4sIHRydWUpfVxuICAgICAgICAgIHsuLi5nZXRSZXNpemVyUHJvcHMoJ2ZpbmFsU3RhdGUnLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcyl9XG4gICAgICAgIC8+XG4gICAgICApIDogbnVsbFxuXG4gICAgICBjb25zdCBpc1NvcnRhYmxlID0gXy5nZXRGaXJzdERlZmluZWQoY29sdW1uLnNvcnRhYmxlLCBzb3J0YWJsZSwgZmFsc2UpXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoXG4gICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgaXNSZXNpemFibGUgJiYgJ3J0LXJlc2l6YWJsZS1oZWFkZXInLFxuICAgICAgICAgICAgc29ydCA/IChzb3J0LmRlc2MgPyAnLXNvcnQtZGVzYycgOiAnLXNvcnQtYXNjJykgOiAnJyxcbiAgICAgICAgICAgIGlzU29ydGFibGUgJiYgJy1jdXJzb3ItcG9pbnRlcicsXG4gICAgICAgICAgICAhc2hvdyAmJiAnLWhpZGRlbicsXG4gICAgICAgICAgICBwaXZvdEJ5ICYmIHBpdm90Qnkuc2xpY2UoMCwgLTEpLmluY2x1ZGVzKGNvbHVtbi5pZCkgJiYgJ3J0LWhlYWRlci1waXZvdCdcbiAgICAgICAgICApfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICBmbGV4OiBgJHt3aWR0aH0gMCBhdXRvYCxcbiAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxuICAgICAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXG4gICAgICAgICAgfX1cbiAgICAgICAgICB0b2dnbGVTb3J0PXtlID0+IHtcbiAgICAgICAgICAgIGlmIChpc1NvcnRhYmxlKSB0aGlzLnNvcnRDb2x1bW4oY29sdW1uLCBtdWx0aVNvcnQgPyBlLnNoaWZ0S2V5IDogZmFsc2UpXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIDxkaXYgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGlzUmVzaXphYmxlICYmICdydC1yZXNpemFibGUtaGVhZGVyLWNvbnRlbnQnKX0+XG4gICAgICAgICAgICB7Xy5ub3JtYWxpemVDb21wb25lbnQoY29sdW1uLkhlYWRlciwge1xuICAgICAgICAgICAgICBkYXRhOiBzb3J0ZWREYXRhLFxuICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICB7cmVzaXplcn1cbiAgICAgICAgPC9UaENvbXBvbmVudD5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlSGVhZGVycyA9ICgpID0+IHtcbiAgICAgIGNvbnN0IHRoZWFkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICBjb25zdCB0aGVhZFRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGhlYWRUclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaGVhZENvbXBvbmVudFxuICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcygnLWhlYWRlcicsIHRoZWFkUHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgXG4gICAgICAgICAgICBtaW5XaWR0aDogYCR7cm93TWluV2lkdGh9cHhgLFxuICAgICAgICAgICAgLi4udGhlYWRQcm9wcy5zdHlsZSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi50aGVhZFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICA8VHJDb21wb25lbnRcbiAgICAgICAgICAgIGNsYXNzTmFtZT17dGhlYWRUclByb3BzLmNsYXNzTmFtZX1cbiAgICAgICAgICAgIHN0eWxlPXt0aGVhZFRyUHJvcHMuc3R5bGV9XG4gICAgICAgICAgICB7Li4udGhlYWRUclByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge3Zpc2libGVDb2x1bW5zLm1hcChtYWtlSGVhZGVyKX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICA8L1RoZWFkQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VGaWx0ZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0aGVhZEZpbHRlclRoUHJvcHMgPSBfLnNwbGl0UHJvcHMoXG4gICAgICAgIGdldFRoZWFkRmlsdGVyVGhQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcylcbiAgICAgIClcbiAgICAgIGNvbnN0IGNvbHVtbkhlYWRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBjb2x1bW4uZ2V0SGVhZGVyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCBjb2x1bW4sIHRoaXMpXG4gICAgICApXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbXG4gICAgICAgIGNvbHVtbi5oZWFkZXJDbGFzc05hbWUsXG4gICAgICAgIHRoZWFkRmlsdGVyVGhQcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkhlYWRlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi5jb2x1bW4uaGVhZGVyU3R5bGUsXG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uSGVhZGVyUHJvcHMuc3R5bGUsXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJlc3QgPSB7XG4gICAgICAgIC4uLnRoZWFkRmlsdGVyVGhQcm9wcy5yZXN0LFxuICAgICAgICAuLi5jb2x1bW5IZWFkZXJQcm9wcy5yZXN0LFxuICAgICAgfVxuXG4gICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJlZC5maW5kKGZpbHRlciA9PiBmaWx0ZXIuaWQgPT09IGNvbHVtbi5pZClcblxuICAgICAgY29uc3QgUmVzb2x2ZWRGaWx0ZXJDb21wb25lbnQgPSBjb2x1bW4uRmlsdGVyIHx8IEZpbHRlckNvbXBvbmVudFxuXG4gICAgICBjb25zdCBpc0ZpbHRlcmFibGUgPSBfLmdldEZpcnN0RGVmaW5lZChjb2x1bW4uZmlsdGVyYWJsZSwgZmlsdGVyYWJsZSwgZmFsc2UpXG5cbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUaENvbXBvbmVudFxuICAgICAgICAgIGtleT17YCR7aX0tJHtjb2x1bW4uaWR9YH1cbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoY2xhc3Nlcyl9XG4gICAgICAgICAgc3R5bGU9e3tcbiAgICAgICAgICAgIC4uLnN0eWxlcyxcbiAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgd2lkdGg6IF8uYXNQeCh3aWR0aCksXG4gICAgICAgICAgICBtYXhXaWR0aDogXy5hc1B4KG1heFdpZHRoKSxcbiAgICAgICAgICB9fVxuICAgICAgICAgIHsuLi5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge2lzRmlsdGVyYWJsZVxuICAgICAgICAgICAgPyBfLm5vcm1hbGl6ZUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICBSZXNvbHZlZEZpbHRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgICAgICAgICBmaWx0ZXIsXG4gICAgICAgICAgICAgICAgICBvbkNoYW5nZTogdmFsdWUgPT4gdGhpcy5maWx0ZXJDb2x1bW4oY29sdW1uLCB2YWx1ZSksXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICBkZWZhdWx0UHJvcHMuY29sdW1uLkZpbHRlclxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICA6IG51bGx9XG4gICAgICAgIDwvVGhDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUZpbHRlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0aGVhZEZpbHRlclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEZpbHRlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgKVxuICAgICAgY29uc3QgdGhlYWRGaWx0ZXJUclByb3BzID0gXy5zcGxpdFByb3BzKFxuICAgICAgICBnZXRUaGVhZEZpbHRlclRyUHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICApXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGhlYWRDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e2NsYXNzbmFtZXMoJy1maWx0ZXJzJywgdGhlYWRGaWx0ZXJQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGAsXG4gICAgICAgICAgICAuLi50aGVhZEZpbHRlclByb3BzLnN0eWxlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnRoZWFkRmlsdGVyUHJvcHMucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXt0aGVhZEZpbHRlclRyUHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgICAgc3R5bGU9e3RoZWFkRmlsdGVyVHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50aGVhZEZpbHRlclRyUHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dmlzaWJsZUNvbHVtbnMubWFwKG1ha2VGaWx0ZXIpfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgIDwvVGhlYWRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZ2VSb3cgPSAocm93LCBpLCBwYXRoID0gW10pID0+IHtcbiAgICAgIGNvbnN0IHJvd0luZm8gPSB7XG4gICAgICAgIG9yaWdpbmFsOiByb3dbb3JpZ2luYWxLZXldLFxuICAgICAgICByb3csXG4gICAgICAgIGluZGV4OiByb3dbaW5kZXhLZXldLFxuICAgICAgICB2aWV3SW5kZXg6IChyb3dJbmRleCArPSAxKSxcbiAgICAgICAgcGFnZVNpemUsXG4gICAgICAgIHBhZ2UsXG4gICAgICAgIGxldmVsOiBwYXRoLmxlbmd0aCxcbiAgICAgICAgbmVzdGluZ1BhdGg6IHBhdGguY29uY2F0KFtpXSksXG4gICAgICAgIGFnZ3JlZ2F0ZWQ6IHJvd1thZ2dyZWdhdGVkS2V5XSxcbiAgICAgICAgZ3JvdXBlZEJ5UGl2b3Q6IHJvd1tncm91cGVkQnlQaXZvdEtleV0sXG4gICAgICAgIHN1YlJvd3M6IHJvd1tzdWJSb3dzS2V5XSxcbiAgICAgIH1cbiAgICAgIGNvbnN0IGlzRXhwYW5kZWQgPSBfLmdldChleHBhbmRlZCwgcm93SW5mby5uZXN0aW5nUGF0aClcbiAgICAgIGNvbnN0IHRyR3JvdXBQcm9wcyA9IGdldFRyR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCB1bmRlZmluZWQsIHRoaXMpXG4gICAgICBjb25zdCB0clByb3BzID0gXy5zcGxpdFByb3BzKGdldFRyUHJvcHMoZmluYWxTdGF0ZSwgcm93SW5mbywgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIHJldHVybiAoXG4gICAgICAgIDxUckdyb3VwQ29tcG9uZW50IGtleT17cm93SW5mby5uZXN0aW5nUGF0aC5qb2luKCdfJyl9IHsuLi50ckdyb3VwUHJvcHN9PlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRyUHJvcHMuY2xhc3NOYW1lLCByb3cuX3ZpZXdJbmRleCAlIDIgPyAnLWV2ZW4nIDogJy1vZGQnKX1cbiAgICAgICAgICAgIHN0eWxlPXt0clByb3BzLnN0eWxlfVxuICAgICAgICAgICAgey4uLnRyUHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dmlzaWJsZUNvbHVtbnMubWFwKChjb2x1bW4sIGkyKSA9PiB7XG4gICAgICAgICAgICAgIGNvbnN0IHJlc2l6ZWRDb2wgPSByZXNpemVkLmZpbmQoeCA9PiB4LmlkID09PSBjb2x1bW4uaWQpIHx8IHt9XG4gICAgICAgICAgICAgIGNvbnN0IHNob3cgPSB0eXBlb2YgY29sdW1uLnNob3cgPT09ICdmdW5jdGlvbicgPyBjb2x1bW4uc2hvdygpIDogY29sdW1uLnNob3dcbiAgICAgICAgICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgbWF4V2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5tYXhXaWR0aClcbiAgICAgICAgICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHJvd0luZm8sIGNvbHVtbiwgdGhpcykpXG4gICAgICAgICAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCByb3dJbmZvLCBjb2x1bW4sIHRoaXMpKVxuXG4gICAgICAgICAgICAgIGNvbnN0IGNsYXNzZXMgPSBbdGRQcm9wcy5jbGFzc05hbWUsIGNvbHVtbi5jbGFzc05hbWUsIGNvbHVtblByb3BzLmNsYXNzTmFtZV1cblxuICAgICAgICAgICAgICBjb25zdCBzdHlsZXMgPSB7XG4gICAgICAgICAgICAgICAgLi4udGRQcm9wcy5zdHlsZSxcbiAgICAgICAgICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgICAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGUsXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCBjZWxsSW5mbyA9IHtcbiAgICAgICAgICAgICAgICAuLi5yb3dJbmZvLFxuICAgICAgICAgICAgICAgIGlzRXhwYW5kZWQsXG4gICAgICAgICAgICAgICAgY29sdW1uOiB7IC4uLmNvbHVtbiB9LFxuICAgICAgICAgICAgICAgIHZhbHVlOiByb3dJbmZvLnJvd1tjb2x1bW4uaWRdLFxuICAgICAgICAgICAgICAgIHBpdm90ZWQ6IGNvbHVtbi5waXZvdGVkLFxuICAgICAgICAgICAgICAgIGV4cGFuZGVyOiBjb2x1bW4uZXhwYW5kZXIsXG4gICAgICAgICAgICAgICAgcmVzaXplZCxcbiAgICAgICAgICAgICAgICBzaG93LFxuICAgICAgICAgICAgICAgIHdpZHRoLFxuICAgICAgICAgICAgICAgIG1heFdpZHRoLFxuICAgICAgICAgICAgICAgIHRkUHJvcHMsXG4gICAgICAgICAgICAgICAgY29sdW1uUHJvcHMsXG4gICAgICAgICAgICAgICAgY2xhc3NlcyxcbiAgICAgICAgICAgICAgICBzdHlsZXMsXG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCB2YWx1ZSA9IGNlbGxJbmZvLnZhbHVlXG5cbiAgICAgICAgICAgICAgbGV0IHVzZU9uRXhwYW5kZXJDbGlja1xuICAgICAgICAgICAgICBsZXQgaXNCcmFuY2hcbiAgICAgICAgICAgICAgbGV0IGlzUHJldmlld1xuXG4gICAgICAgICAgICAgIGNvbnN0IG9uRXhwYW5kZXJDbGljayA9IGUgPT4ge1xuICAgICAgICAgICAgICAgIGxldCBuZXdFeHBhbmRlZCA9IF8uY2xvbmUoZXhwYW5kZWQpXG4gICAgICAgICAgICAgICAgaWYgKGlzRXhwYW5kZWQpIHtcbiAgICAgICAgICAgICAgICAgIG5ld0V4cGFuZGVkID0gXy5zZXQobmV3RXhwYW5kZWQsIGNlbGxJbmZvLm5lc3RpbmdQYXRoLCBmYWxzZSlcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgbmV3RXhwYW5kZWQgPSBfLnNldChuZXdFeHBhbmRlZCwgY2VsbEluZm8ubmVzdGluZ1BhdGgsIHt9KVxuICAgICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICAgIHJldHVybiB0aGlzLnNldFN0YXRlV2l0aERhdGEoXG4gICAgICAgICAgICAgICAgICB7XG4gICAgICAgICAgICAgICAgICAgIGV4cGFuZGVkOiBuZXdFeHBhbmRlZCxcbiAgICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgICAoKSA9PiBvbkV4cGFuZGVkQ2hhbmdlICYmIG9uRXhwYW5kZWRDaGFuZ2UobmV3RXhwYW5kZWQsIGNlbGxJbmZvLm5lc3RpbmdQYXRoLCBlKVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIC8vIERlZmF1bHQgdG8gYSBzdGFuZGFyZCBjZWxsXG4gICAgICAgICAgICAgIGxldCByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChjb2x1bW4uQ2VsbCwgY2VsbEluZm8sIHZhbHVlKVxuXG4gICAgICAgICAgICAgIC8vIFJlc29sdmUgUmVuZGVyZXJzXG4gICAgICAgICAgICAgIGNvbnN0IFJlc29sdmVkQWdncmVnYXRlZENvbXBvbmVudCA9XG4gICAgICAgICAgICAgICAgY29sdW1uLkFnZ3JlZ2F0ZWQgfHwgKCFjb2x1bW4uYWdncmVnYXRlID8gQWdncmVnYXRlZENvbXBvbmVudCA6IGNvbHVtbi5DZWxsKVxuICAgICAgICAgICAgICBjb25zdCBSZXNvbHZlZEV4cGFuZGVyQ29tcG9uZW50ID0gY29sdW1uLkV4cGFuZGVyIHx8IEV4cGFuZGVyQ29tcG9uZW50XG4gICAgICAgICAgICAgIGNvbnN0IFJlc29sdmVkUGl2b3RWYWx1ZUNvbXBvbmVudCA9IGNvbHVtbi5QaXZvdFZhbHVlIHx8IFBpdm90VmFsdWVDb21wb25lbnRcbiAgICAgICAgICAgICAgY29uc3QgRGVmYXVsdFJlc29sdmVkUGl2b3RDb21wb25lbnQgPVxuICAgICAgICAgICAgICAgIFBpdm90Q29tcG9uZW50IHx8XG4gICAgICAgICAgICAgICAgKHByb3BzID0+IChcbiAgICAgICAgICAgICAgICAgIDxkaXY+XG4gICAgICAgICAgICAgICAgICAgIDxSZXNvbHZlZEV4cGFuZGVyQ29tcG9uZW50IHsuLi5wcm9wc30gLz5cbiAgICAgICAgICAgICAgICAgICAgPFJlc29sdmVkUGl2b3RWYWx1ZUNvbXBvbmVudCB7Li4ucHJvcHN9IC8+XG4gICAgICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgICAgICApKVxuICAgICAgICAgICAgICBjb25zdCBSZXNvbHZlZFBpdm90Q29tcG9uZW50ID0gY29sdW1uLlBpdm90IHx8IERlZmF1bHRSZXNvbHZlZFBpdm90Q29tcG9uZW50XG5cbiAgICAgICAgICAgICAgLy8gSXMgdGhpcyBjZWxsIGV4cGFuZGFibGU/XG4gICAgICAgICAgICAgIGlmIChjZWxsSW5mby5waXZvdGVkIHx8IGNlbGxJbmZvLmV4cGFuZGVyKSB7XG4gICAgICAgICAgICAgICAgLy8gTWFrZSBpdCBleHBhbmRhYmxlIGJ5IGRlZnVhbHRcbiAgICAgICAgICAgICAgICBjZWxsSW5mby5leHBhbmRhYmxlID0gdHJ1ZVxuICAgICAgICAgICAgICAgIHVzZU9uRXhwYW5kZXJDbGljayA9IHRydWVcbiAgICAgICAgICAgICAgICAvLyBJZiBwaXZvdGVkLCBoYXMgbm8gc3ViUm93cywgYW5kIGRvZXMgbm90IGhhdmUgYSBzdWJDb21wb25lbnQsXG4gICAgICAgICAgICAgICAgLy8gZG8gbm90IG1ha2UgZXhwYW5kYWJsZVxuICAgICAgICAgICAgICAgIGlmIChjZWxsSW5mby5waXZvdGVkICYmICFjZWxsSW5mby5zdWJSb3dzICYmICFTdWJDb21wb25lbnQpIHtcbiAgICAgICAgICAgICAgICAgIGNlbGxJbmZvLmV4cGFuZGFibGUgPSBmYWxzZVxuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChjZWxsSW5mby5waXZvdGVkKSB7XG4gICAgICAgICAgICAgICAgLy8gSXMgdGhpcyBjb2x1bW4gYSBicmFuY2g/XG4gICAgICAgICAgICAgICAgaXNCcmFuY2ggPSByb3dJbmZvLnJvd1twaXZvdElES2V5XSA9PT0gY29sdW1uLmlkICYmIGNlbGxJbmZvLnN1YlJvd3NcbiAgICAgICAgICAgICAgICAvLyBTaG91bGQgdGhpcyBjb2x1bW4gYmUgYmxhbms/XG4gICAgICAgICAgICAgICAgaXNQcmV2aWV3ID1cbiAgICAgICAgICAgICAgICAgIHBpdm90QnkuaW5kZXhPZihjb2x1bW4uaWQpID4gcGl2b3RCeS5pbmRleE9mKHJvd0luZm8ucm93W3Bpdm90SURLZXldKSAmJlxuICAgICAgICAgICAgICAgICAgY2VsbEluZm8uc3ViUm93c1xuICAgICAgICAgICAgICAgIC8vIFBpdm90IENlbGwgUmVuZGVyIE92ZXJyaWRlXG4gICAgICAgICAgICAgICAgaWYgKGlzQnJhbmNoKSB7XG4gICAgICAgICAgICAgICAgICAvLyBpc1Bpdm90XG4gICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChcbiAgICAgICAgICAgICAgICAgICAgUmVzb2x2ZWRQaXZvdENvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgICAgICAgIC4uLmNlbGxJbmZvLFxuICAgICAgICAgICAgICAgICAgICAgIHZhbHVlOiByb3dbcGl2b3RWYWxLZXldLFxuICAgICAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgICAgICByb3dbcGl2b3RWYWxLZXldXG4gICAgICAgICAgICAgICAgICApXG4gICAgICAgICAgICAgICAgfSBlbHNlIGlmIChpc1ByZXZpZXcpIHtcbiAgICAgICAgICAgICAgICAgIC8vIFNob3cgdGhlIHBpdm90IHByZXZpZXdcbiAgICAgICAgICAgICAgICAgIHJlc29sdmVkQ2VsbCA9IF8ubm9ybWFsaXplQ29tcG9uZW50KFJlc29sdmVkQWdncmVnYXRlZENvbXBvbmVudCwgY2VsbEluZm8sIHZhbHVlKVxuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBudWxsXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGNlbGxJbmZvLmFnZ3JlZ2F0ZWQpIHtcbiAgICAgICAgICAgICAgICByZXNvbHZlZENlbGwgPSBfLm5vcm1hbGl6ZUNvbXBvbmVudChSZXNvbHZlZEFnZ3JlZ2F0ZWRDb21wb25lbnQsIGNlbGxJbmZvLCB2YWx1ZSlcbiAgICAgICAgICAgICAgfVxuXG4gICAgICAgICAgICAgIGlmIChjZWxsSW5mby5leHBhbmRlcikge1xuICAgICAgICAgICAgICAgIHJlc29sdmVkQ2VsbCA9IF8ubm9ybWFsaXplQ29tcG9uZW50KFxuICAgICAgICAgICAgICAgICAgUmVzb2x2ZWRFeHBhbmRlckNvbXBvbmVudCxcbiAgICAgICAgICAgICAgICAgIGNlbGxJbmZvLFxuICAgICAgICAgICAgICAgICAgcm93W3Bpdm90VmFsS2V5XVxuICAgICAgICAgICAgICAgIClcbiAgICAgICAgICAgICAgICBpZiAocGl2b3RCeSkge1xuICAgICAgICAgICAgICAgICAgaWYgKGNlbGxJbmZvLmdyb3VwZWRCeVBpdm90KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVkQ2VsbCA9IG51bGxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICAgIGlmICghY2VsbEluZm8uc3ViUm93cyAmJiAhU3ViQ29tcG9uZW50KSB7XG4gICAgICAgICAgICAgICAgICAgIHJlc29sdmVkQ2VsbCA9IG51bGxcbiAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBjb25zdCByZXNvbHZlZE9uRXhwYW5kZXJDbGljayA9IHVzZU9uRXhwYW5kZXJDbGljayA/IG9uRXhwYW5kZXJDbGljayA6ICgpID0+IHt9XG5cbiAgICAgICAgICAgICAgLy8gSWYgdGhlcmUgYXJlIG11bHRpcGxlIG9uQ2xpY2sgZXZlbnRzLCBtYWtlIHN1cmUgdGhleSBkb24ndFxuICAgICAgICAgICAgICAvLyBvdmVycmlkZSBlYWNob3RoZXIuIFRoaXMgc2hvdWxkIG1heWJlIGJlIGV4cGFuZGVkIHRvIGhhbmRsZSBhbGxcbiAgICAgICAgICAgICAgLy8gZnVuY3Rpb24gYXR0cmlidXRlc1xuICAgICAgICAgICAgICBjb25zdCBpbnRlcmFjdGlvblByb3BzID0ge1xuICAgICAgICAgICAgICAgIG9uQ2xpY2s6IHJlc29sdmVkT25FeHBhbmRlckNsaWNrLFxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgaWYgKHRkUHJvcHMucmVzdC5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25Qcm9wcy5vbkNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgICB0ZFByb3BzLnJlc3Qub25DbGljayhlLCAoKSA9PiByZXNvbHZlZE9uRXhwYW5kZXJDbGljayhlKSlcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgICBpZiAoY29sdW1uUHJvcHMucmVzdC5vbkNsaWNrKSB7XG4gICAgICAgICAgICAgICAgaW50ZXJhY3Rpb25Qcm9wcy5vbkNsaWNrID0gZSA9PiB7XG4gICAgICAgICAgICAgICAgICBjb2x1bW5Qcm9wcy5yZXN0Lm9uQ2xpY2soZSwgKCkgPT4gcmVzb2x2ZWRPbkV4cGFuZGVyQ2xpY2soZSkpXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICB9XG5cbiAgICAgICAgICAgICAgLy8gUmV0dXJuIHRoZSBjZWxsXG4gICAgICAgICAgICAgIHJldHVybiAoXG4gICAgICAgICAgICAgICAgPFRkQ29tcG9uZW50XG4gICAgICAgICAgICAgICAgICAvLyBlc2xpbnQtZGlzYWJsZS1uZXh0LWxpbmUgcmVhY3Qvbm8tYXJyYXktaW5kZXgta2V5XG4gICAgICAgICAgICAgICAgICBrZXk9e2Ake2kyfS0ke2NvbHVtbi5pZH1gfVxuICAgICAgICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAgICAgICBjbGFzc2VzLFxuICAgICAgICAgICAgICAgICAgICAhY2VsbEluZm8uZXhwYW5kYWJsZSAmJiAhc2hvdyAmJiAnaGlkZGVuJyxcbiAgICAgICAgICAgICAgICAgICAgY2VsbEluZm8uZXhwYW5kYWJsZSAmJiAncnQtZXhwYW5kYWJsZScsXG4gICAgICAgICAgICAgICAgICAgIChpc0JyYW5jaCB8fCBpc1ByZXZpZXcpICYmICdydC1waXZvdCdcbiAgICAgICAgICAgICAgICAgICl9XG4gICAgICAgICAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgICAgICAgICAuLi5zdHlsZXMsXG4gICAgICAgICAgICAgICAgICAgIGZsZXg6IGAke3dpZHRofSAwIGF1dG9gLFxuICAgICAgICAgICAgICAgICAgICB3aWR0aDogXy5hc1B4KHdpZHRoKSxcbiAgICAgICAgICAgICAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXG4gICAgICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICAgICAgey4uLnRkUHJvcHMucmVzdH1cbiAgICAgICAgICAgICAgICAgIHsuLi5jb2x1bW5Qcm9wcy5yZXN0fVxuICAgICAgICAgICAgICAgICAgey4uLmludGVyYWN0aW9uUHJvcHN9XG4gICAgICAgICAgICAgICAgPlxuICAgICAgICAgICAgICAgICAge3Jlc29sdmVkQ2VsbH1cbiAgICAgICAgICAgICAgICA8L1RkQ29tcG9uZW50PlxuICAgICAgICAgICAgICApXG4gICAgICAgICAgICB9KX1cbiAgICAgICAgICA8L1RyQ29tcG9uZW50PlxuICAgICAgICAgIHtyb3dJbmZvLnN1YlJvd3MgJiZcbiAgICAgICAgICAgIGlzRXhwYW5kZWQgJiZcbiAgICAgICAgICAgIHJvd0luZm8uc3ViUm93cy5tYXAoKGQsIGkpID0+IG1ha2VQYWdlUm93KGQsIGksIHJvd0luZm8ubmVzdGluZ1BhdGgpKX1cbiAgICAgICAgICB7U3ViQ29tcG9uZW50ICYmICFyb3dJbmZvLnN1YlJvd3MgJiYgaXNFeHBhbmRlZCAmJiBTdWJDb21wb25lbnQocm93SW5mbywgKCkgPT4ge1xuICAgICAgICAgICAgY29uc3QgbmV3RXhwYW5kZWQgPSBfLmNsb25lKGV4cGFuZGVkKVxuXG4gICAgICAgICAgICBfLnNldChuZXdFeHBhbmRlZCwgY2VsbEluZm8ubmVzdGluZ1BhdGgsIGZhbHNlKVxuICAgICAgICAgIH0pfVxuICAgICAgICA8L1RyR3JvdXBDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZENvbHVtbiA9IChjb2x1bW4sIGkpID0+IHtcbiAgICAgIGNvbnN0IHJlc2l6ZWRDb2wgPSByZXNpemVkLmZpbmQoeCA9PiB4LmlkID09PSBjb2x1bW4uaWQpIHx8IHt9XG4gICAgICBjb25zdCBzaG93ID0gdHlwZW9mIGNvbHVtbi5zaG93ID09PSAnZnVuY3Rpb24nID8gY29sdW1uLnNob3coKSA6IGNvbHVtbi5zaG93XG4gICAgICBjb25zdCB3aWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1pbldpZHRoKVxuICAgICAgY29uc3QgZmxleCA9IHdpZHRoXG4gICAgICBjb25zdCBtYXhXaWR0aCA9IF8uZ2V0Rmlyc3REZWZpbmVkKHJlc2l6ZWRDb2wudmFsdWUsIGNvbHVtbi53aWR0aCwgY29sdW1uLm1heFdpZHRoKVxuICAgICAgY29uc3QgdGRQcm9wcyA9IF8uc3BsaXRQcm9wcyhnZXRUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG5cbiAgICAgIGNvbnN0IGNsYXNzZXMgPSBbdGRQcm9wcy5jbGFzc05hbWUsIGNvbHVtbi5jbGFzc05hbWUsIGNvbHVtblByb3BzLmNsYXNzTmFtZV1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi50ZFByb3BzLnN0eWxlLFxuICAgICAgICAuLi5jb2x1bW4uc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtblByb3BzLnN0eWxlLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzZXMsICFzaG93ICYmICdoaWRkZW4nKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgZmxleDogYCR7ZmxleH0gMCBhdXRvYCxcbiAgICAgICAgICAgIHdpZHRoOiBfLmFzUHgod2lkdGgpLFxuICAgICAgICAgICAgbWF4V2lkdGg6IF8uYXNQeChtYXhXaWR0aCksXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4udGRQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KFBhZFJvd0NvbXBvbmVudCl9XG4gICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZFJvdyA9IChyb3csIGkpID0+IHtcbiAgICAgIGNvbnN0IHRyR3JvdXBQcm9wcyA9IGdldFRyR3JvdXBQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcylcbiAgICAgIGNvbnN0IHRyUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VHJHcm91cENvbXBvbmVudCBrZXk9e2BwYWQtJHtpfWB9IHsuLi50ckdyb3VwUHJvcHN9PlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKFxuICAgICAgICAgICAgICAnLXBhZFJvdycsXG4gICAgICAgICAgICAgIChwYWdlUm93cy5sZW5ndGggKyBpKSAlIDIgPyAnLWV2ZW4nIDogJy1vZGQnLFxuICAgICAgICAgICAgICB0clByb3BzLmNsYXNzTmFtZVxuICAgICAgICAgICAgKX1cbiAgICAgICAgICAgIHN0eWxlPXt0clByb3BzLnN0eWxlIHx8IHt9fVxuICAgICAgICAgID5cbiAgICAgICAgICAgIHt2aXNpYmxlQ29sdW1ucy5tYXAobWFrZVBhZENvbHVtbil9XG4gICAgICAgICAgPC9UckNvbXBvbmVudD5cbiAgICAgICAgPC9Uckdyb3VwQ29tcG9uZW50PlxuICAgICAgKVxuICAgIH1cblxuICAgIGNvbnN0IG1ha2VDb2x1bW5Gb290ZXIgPSAoY29sdW1uLCBpKSA9PiB7XG4gICAgICBjb25zdCByZXNpemVkQ29sID0gcmVzaXplZC5maW5kKHggPT4geC5pZCA9PT0gY29sdW1uLmlkKSB8fCB7fVxuICAgICAgY29uc3Qgc2hvdyA9IHR5cGVvZiBjb2x1bW4uc2hvdyA9PT0gJ2Z1bmN0aW9uJyA/IGNvbHVtbi5zaG93KCkgOiBjb2x1bW4uc2hvd1xuICAgICAgY29uc3Qgd2lkdGggPSBfLmdldEZpcnN0RGVmaW5lZChyZXNpemVkQ29sLnZhbHVlLCBjb2x1bW4ud2lkdGgsIGNvbHVtbi5taW5XaWR0aClcbiAgICAgIGNvbnN0IG1heFdpZHRoID0gXy5nZXRGaXJzdERlZmluZWQocmVzaXplZENvbC52YWx1ZSwgY29sdW1uLndpZHRoLCBjb2x1bW4ubWF4V2lkdGgpXG4gICAgICBjb25zdCB0Rm9vdFRkUHJvcHMgPSBfLnNwbGl0UHJvcHMoZ2V0VGZvb3RUZFByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKSlcbiAgICAgIGNvbnN0IGNvbHVtblByb3BzID0gXy5zcGxpdFByb3BzKGNvbHVtbi5nZXRQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIGNvbHVtbiwgdGhpcykpXG4gICAgICBjb25zdCBjb2x1bW5Gb290ZXJQcm9wcyA9IF8uc3BsaXRQcm9wcyhcbiAgICAgICAgY29sdW1uLmdldEZvb3RlclByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgY29sdW1uLCB0aGlzKVxuICAgICAgKVxuXG4gICAgICBjb25zdCBjbGFzc2VzID0gW1xuICAgICAgICB0Rm9vdFRkUHJvcHMuY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW4uY2xhc3NOYW1lLFxuICAgICAgICBjb2x1bW5Qcm9wcy5jbGFzc05hbWUsXG4gICAgICAgIGNvbHVtbkZvb3RlclByb3BzLmNsYXNzTmFtZSxcbiAgICAgIF1cblxuICAgICAgY29uc3Qgc3R5bGVzID0ge1xuICAgICAgICAuLi50Rm9vdFRkUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbi5zdHlsZSxcbiAgICAgICAgLi4uY29sdW1uUHJvcHMuc3R5bGUsXG4gICAgICAgIC4uLmNvbHVtbkZvb3RlclByb3BzLnN0eWxlLFxuICAgICAgfVxuXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGRDb21wb25lbnRcbiAgICAgICAgICBrZXk9e2Ake2l9LSR7Y29sdW1uLmlkfWB9XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKGNsYXNzZXMsICFzaG93ICYmICdoaWRkZW4nKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGVzLFxuICAgICAgICAgICAgZmxleDogYCR7d2lkdGh9IDAgYXV0b2AsXG4gICAgICAgICAgICB3aWR0aDogXy5hc1B4KHdpZHRoKSxcbiAgICAgICAgICAgIG1heFdpZHRoOiBfLmFzUHgobWF4V2lkdGgpLFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLmNvbHVtblByb3BzLnJlc3R9XG4gICAgICAgICAgey4uLnRGb290VGRQcm9wcy5yZXN0fVxuICAgICAgICAgIHsuLi5jb2x1bW5Gb290ZXJQcm9wcy5yZXN0fVxuICAgICAgICA+XG4gICAgICAgICAge18ubm9ybWFsaXplQ29tcG9uZW50KGNvbHVtbi5Gb290ZXIsIHtcbiAgICAgICAgICAgIGRhdGE6IHNvcnRlZERhdGEsXG4gICAgICAgICAgICBjb2x1bW4sXG4gICAgICAgICAgfSl9XG4gICAgICAgIDwvVGRDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZUNvbHVtbkZvb3RlcnMgPSAoKSA9PiB7XG4gICAgICBjb25zdCB0Rm9vdFByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290UHJvcHMoZmluYWxTdGF0ZSwgdW5kZWZpbmVkLCB1bmRlZmluZWQsIHRoaXMpKVxuICAgICAgY29uc3QgdEZvb3RUclByb3BzID0gXy5zcGxpdFByb3BzKGdldFRmb290VHJQcm9wcyhmaW5hbFN0YXRlLCB1bmRlZmluZWQsIHVuZGVmaW5lZCwgdGhpcykpXG4gICAgICByZXR1cm4gKFxuICAgICAgICA8VGZvb3RDb21wb25lbnRcbiAgICAgICAgICBjbGFzc05hbWU9e3RGb290UHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICBcbiAgICAgICAgICAgIG1pbldpZHRoOiBgJHtyb3dNaW5XaWR0aH1weGAsXG4gICAgICAgICAgICAuLi50Rm9vdFByb3BzLnN0eWxlLFxuICAgICAgICAgIH19XG4gICAgICAgICAgey4uLnRGb290UHJvcHMucmVzdH1cbiAgICAgICAgPlxuICAgICAgICAgIDxUckNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRGb290VHJQcm9wcy5jbGFzc05hbWUpfVxuICAgICAgICAgICAgc3R5bGU9e3RGb290VHJQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50Rm9vdFRyUHJvcHMucmVzdH1cbiAgICAgICAgICA+XG4gICAgICAgICAgICB7dmlzaWJsZUNvbHVtbnMubWFwKG1ha2VDb2x1bW5Gb290ZXIpfVxuICAgICAgICAgIDwvVHJDb21wb25lbnQ+XG4gICAgICAgIDwvVGZvb3RDb21wb25lbnQ+XG4gICAgICApXG4gICAgfVxuXG4gICAgY29uc3QgbWFrZVBhZ2luYXRpb24gPSAoaXNUb3ApID0+IHtcbiAgICAgIGNvbnN0IHBhZ2luYXRpb25Qcm9wcyA9IF8uc3BsaXRQcm9wcyhcbiAgICAgICAgZ2V0UGFnaW5hdGlvblByb3BzKGZpbmFsU3RhdGUsIHVuZGVmaW5lZCwgdW5kZWZpbmVkLCB0aGlzKVxuICAgICAgKVxuICAgICAgcmV0dXJuIChcbiAgICAgICAgPFBhZ2luYXRpb25Db21wb25lbnRcbiAgICAgICAgICB7Li4ucmVzb2x2ZWRTdGF0ZX1cbiAgICAgICAgICBwYWdlcz17cGFnZXN9XG4gICAgICAgICAgY2FuUHJldmlvdXM9e2NhblByZXZpb3VzfVxuICAgICAgICAgIGNhbk5leHQ9e2Nhbk5leHR9XG4gICAgICAgICAgb25QYWdlQ2hhbmdlPXt0aGlzLm9uUGFnZUNoYW5nZX1cbiAgICAgICAgICBvblBhZ2VTaXplQ2hhbmdlPXt0aGlzLm9uUGFnZVNpemVDaGFuZ2V9XG4gICAgICAgICAgY2xhc3NOYW1lPXtwYWdpbmF0aW9uUHJvcHMuY2xhc3NOYW1lfVxuICAgICAgICAgIHN0eWxlPXtwYWdpbmF0aW9uUHJvcHMuc3R5bGV9XG4gICAgICAgICAgaXNUb3A9e2lzVG9wfVxuICAgICAgICAgIHsuLi5wYWdpbmF0aW9uUHJvcHMucmVzdH1cbiAgICAgICAgLz5cbiAgICAgIClcbiAgICB9XG5cbiAgICBjb25zdCBtYWtlVGFibGUgPSAoKSA9PiB7XG4gICAgICByZXR1cm4gKFxuICAgICAgICA8ZGl2XG4gICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKCdSZWFjdFRhYmxlJywgY2xhc3NOYW1lLCByb290UHJvcHMuY2xhc3NOYW1lKX1cbiAgICAgICAgICBzdHlsZT17e1xuICAgICAgICAgICAgLi4uc3R5bGUsXG4gICAgICAgICAgICAuLi5yb290UHJvcHMuc3R5bGUsXG4gICAgICAgICAgfX1cbiAgICAgICAgICB7Li4ucm9vdFByb3BzLnJlc3R9XG4gICAgICAgID5cbiAgICAgICAgICB7c2hvd1BhZ2luYXRpb24gJiYgc2hvd1BhZ2luYXRpb25Ub3AgPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2luYXRpb24tdG9wXCI+e21ha2VQYWdpbmF0aW9uKHRydWUpfTwvZGl2PlxuICAgICAgICAgICkgOiBudWxsfVxuICAgICAgICAgIDxUYWJsZUNvbXBvbmVudFxuICAgICAgICAgICAgY2xhc3NOYW1lPXtjbGFzc25hbWVzKHRhYmxlUHJvcHMuY2xhc3NOYW1lLCBjdXJyZW50bHlSZXNpemluZyA/ICdydC1yZXNpemluZycgOiAnJyl9XG4gICAgICAgICAgICBzdHlsZT17dGFibGVQcm9wcy5zdHlsZX1cbiAgICAgICAgICAgIHsuLi50YWJsZVByb3BzLnJlc3R9XG4gICAgICAgICAgPlxuICAgICAgICAgICAge2hhc0hlYWRlckdyb3VwcyA/IGhlYWRlckdyb3Vwcy5tYXAobWFrZUhlYWRlckdyb3VwcykgOiBudWxsfVxuICAgICAgICAgICAge21ha2VIZWFkZXJzKCl9XG4gICAgICAgICAgICB7aGFzRmlsdGVycyA/IG1ha2VGaWx0ZXJzKCkgOiBudWxsfVxuICAgICAgICAgICAgPFRib2R5Q29tcG9uZW50XG4gICAgICAgICAgICAgIGNsYXNzTmFtZT17Y2xhc3NuYW1lcyh0Qm9keVByb3BzLmNsYXNzTmFtZSl9XG4gICAgICAgICAgICAgIHN0eWxlPXt7XG4gICAgICAgICAgICAgICAgbWluV2lkdGg6IGAke3Jvd01pbldpZHRofXB4YCxcbiAgICAgICAgICAgICAgICAuLi50Qm9keVByb3BzLnN0eWxlLFxuICAgICAgICAgICAgICB9fVxuICAgICAgICAgICAgICB7Li4udEJvZHlQcm9wcy5yZXN0fVxuICAgICAgICAgICAgPlxuICAgICAgICAgICAgICB7cGFnZVJvd3MubWFwKChkLCBpKSA9PiBtYWtlUGFnZVJvdyhkLCBpKSl9XG4gICAgICAgICAgICAgIHtwYWRSb3dzLm1hcChtYWtlUGFkUm93KX1cbiAgICAgICAgICAgIDwvVGJvZHlDb21wb25lbnQ+XG4gICAgICAgICAgICB7aGFzQ29sdW1uRm9vdGVyID8gbWFrZUNvbHVtbkZvb3RlcnMoKSA6IG51bGx9XG4gICAgICAgICAgPC9UYWJsZUNvbXBvbmVudD5cbiAgICAgICAgICB7c2hvd1BhZ2luYXRpb24gJiYgc2hvd1BhZ2luYXRpb25Cb3R0b20gPyAoXG4gICAgICAgICAgICA8ZGl2IGNsYXNzTmFtZT1cInBhZ2luYXRpb24tYm90dG9tXCI+e21ha2VQYWdpbmF0aW9uKGZhbHNlKX08L2Rpdj5cbiAgICAgICAgICApIDogbnVsbH1cbiAgICAgICAgICB7IXBhZ2VSb3dzLmxlbmd0aCAmJiAoXG4gICAgICAgICAgICA8Tm9EYXRhQ29tcG9uZW50IHsuLi5ub0RhdGFQcm9wc30+e18ubm9ybWFsaXplQ29tcG9uZW50KG5vRGF0YVRleHQpfTwvTm9EYXRhQ29tcG9uZW50PlxuICAgICAgICAgICl9XG4gICAgICAgICAgPExvYWRpbmdDb21wb25lbnQgbG9hZGluZz17bG9hZGluZ30gbG9hZGluZ1RleHQ9e2xvYWRpbmdUZXh0fSB7Li4ubG9hZGluZ1Byb3BzfSAvPlxuICAgICAgICA8L2Rpdj5cbiAgICAgIClcbiAgICB9XG5cbiAgICAvLyBjaGlsZFByb3BzIGFyZSBvcHRpb25hbGx5IHBhc3NlZCB0byBhIGZ1bmN0aW9uLWFzLWEtY2hpbGRcbiAgICByZXR1cm4gY2hpbGRyZW4gPyBjaGlsZHJlbihmaW5hbFN0YXRlLCBtYWtlVGFibGUsIHRoaXMpIDogbWFrZVRhYmxlKClcbiAgfVxufVxuIl19