import type {ScopeValueSets, NameValue, ValueScope, ValueScopeName} from "./scope"
import {_, nil, _Code, Code, Name, UsedNames, CodeItem, addCodeArg, _CodeOrName} from "./code"
import {Scope, varKinds} from "./scope"

export {_, str, strConcat, nil, getProperty, stringify, regexpCode, Name, Code} from "./code"
export {Scope, ScopeStore, ValueScope, ValueScopeName, ScopeValueSets, varKinds} from "./scope"

// type for expressions that can be safely inserted in code without quotes
export type SafeExpr = Code | number | boolean | null

// type that is either Code of function that adds code to CodeGen instance using its methods
export type Block = Code | (() => void)

export const operators = {
  GT: new _Code(">"),
  GTE: new _Code(">="),
  LT: new _Code("<"),
  LTE: new _Code("<="),
  EQ: new _Code("==="),
  NEQ: new _Code("!=="),
  NOT: new _Code("!"),
  OR: new _Code("||"),
  AND: new _Code("&&"),
  ADD: new _Code("+"),
}

abstract class Node {
  abstract readonly names: UsedNames

  optimizeNodes(): this | ChildNode | ChildNode[] | undefined {
      throw new Error("STUB");
  }

  optimizeNames(_names: UsedNames, _constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  // get count(): number {
  //   return 1
  // }
}

class Def extends Node {
  constructor(
    private readonly varKind: Name,
    private readonly name: Name,
    private rhs?: SafeExpr
  ) {
    super()
  }

  render({es5, _n}: CGOptions): string {
    const varKind = es5 ? varKinds.var : this.varKind
    const rhs = this.rhs === undefined ? "" : ` = ${this.rhs}`
    return `${varKind} ${this.name}${rhs};` + _n
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class Assign extends Node {
  constructor(
    readonly lhs: Code,
    public rhs: SafeExpr,
    private readonly sideEffects?: boolean
  ) {
    super()
  }

  render({_n}: CGOptions): string {
    return `${this.lhs} = ${this.rhs};` + _n
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class AssignOp extends Assign {
  constructor(
    lhs: Code,
    private readonly op: Code,
    rhs: SafeExpr,
    sideEffects?: boolean
  ) {
    super(lhs, rhs, sideEffects)
  }

  render({_n}: CGOptions): string {
    return `${this.lhs} ${this.op}= ${this.rhs};` + _n
  }
}

class Label extends Node {
  readonly names: UsedNames = {}
  constructor(readonly label: Name) {
    super()
  }

  render({_n}: CGOptions): string {
    return `${this.label}:` + _n
  }
}

class Break extends Node {
  readonly names: UsedNames = {}
  constructor(readonly label?: Code) {
    super()
  }

  render({_n}: CGOptions): string {
    const label = this.label ? ` ${this.label}` : ""
    return `break${label};` + _n
  }
}

class Throw extends Node {
  constructor(readonly error: Code) {
    super()
  }

  render({_n}: CGOptions): string {
    return `throw ${this.error};` + _n
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class AnyCode extends Node {
  constructor(private code: SafeExpr) {
    super()
  }

  render({_n}: CGOptions): string {
    return `${this.code};` + _n
  }

  optimizeNodes(): this | undefined {
      throw new Error("STUB");
  }

  optimizeNames(names: UsedNames, constants: Constants): this {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

abstract class ParentNode extends Node {
  constructor(readonly nodes: ChildNode[] = []) {
    super()
  }

  render(opts: CGOptions): string {
    return this.nodes.reduce((code, n) => { throw new Error("STUB"); }, "")
  }

  optimizeNodes(): this | ChildNode | ChildNode[] | undefined {
      throw new Error("STUB");
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }

  // get count(): number {
  //   return this.nodes.reduce((c, n) => c + n.count, 1)
  // }
}

abstract class BlockNode extends ParentNode {
  render(opts: CGOptions): string {
    return "{" + opts._n + super.render(opts) + "}" + opts._n
  }
}

class Root extends ParentNode {}

class Else extends BlockNode {
  static readonly kind = "else"
}

class If extends BlockNode {
  static readonly kind = "if"
  else?: If | Else
  constructor(
    private condition: Code | boolean,
    nodes?: ChildNode[]
  ) {
    super(nodes)
  }

  render(opts: CGOptions): string {
    let code = `if(${this.condition})` + super.render(opts)
    if (this.else) code += "else " + this.else.render(opts)
    return code
  }

  optimizeNodes(): If | ChildNode[] | undefined {
      throw new Error("STUB");
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }

  // get count(): number {
  //   return super.count + (this.else?.count || 0)
  // }
}

abstract class For extends BlockNode {
  static readonly kind = "for"
}

class ForLoop extends For {
  constructor(private iteration: Code) {
    super()
  }

  render(opts: CGOptions): string {
    return `for(${this.iteration})` + super.render(opts)
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class ForRange extends For {
  constructor(
    private readonly varKind: Name,
    private readonly name: Name,
    private readonly from: SafeExpr,
    private readonly to: SafeExpr
  ) {
    super()
  }

  render(opts: CGOptions): string {
    const varKind = opts.es5 ? varKinds.var : this.varKind
    const {name, from, to} = this
    return `for(${varKind} ${name}=${from}; ${name}<${to}; ${name}++)` + super.render(opts)
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class ForIter extends For {
  constructor(
    private readonly loop: "of" | "in",
    private readonly varKind: Name,
    private readonly name: Name,
    private iterable: Code
  ) {
    super()
  }

  render(opts: CGOptions): string {
    return `for(${this.varKind} ${this.name} ${this.loop} ${this.iterable})` + super.render(opts)
  }

  optimizeNames(names: UsedNames, constants: Constants): this | undefined {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }
}

class Func extends BlockNode {
  static readonly kind = "func"
  constructor(
    public name: Name,
    public args: Code,
    public async?: boolean
  ) {
    super()
  }

  render(opts: CGOptions): string {
    const _async = this.async ? "async " : ""
    return `${_async}function ${this.name}(${this.args})` + super.render(opts)
  }
}

class Return extends ParentNode {
  static readonly kind = "return"

  render(opts: CGOptions): string {
    return "return " + super.render(opts)
  }
}

class Try extends BlockNode {
  catch?: Catch
  finally?: Finally

  render(opts: CGOptions): string {
    let code = "try" + super.render(opts)
    if (this.catch) code += this.catch.render(opts)
    if (this.finally) code += this.finally.render(opts)
    return code
  }

  optimizeNodes(): this {
      throw new Error("STUB");
  }

  optimizeNames(names: UsedNames, constants: Constants): this {
      throw new Error("STUB");
  }

  get names(): UsedNames {
      throw new Error("STUB");
  }

  // get count(): number {
  //   return super.count + (this.catch?.count || 0) + (this.finally?.count || 0)
  // }
}

class Catch extends BlockNode {
  static readonly kind = "catch"
  constructor(readonly error: Name) {
    super()
  }

  render(opts: CGOptions): string {
    return `catch(${this.error})` + super.render(opts)
  }
}

class Finally extends BlockNode {
  static readonly kind = "finally"
  render(opts: CGOptions): string {
    return "finally" + super.render(opts)
  }
}

type StartBlockNode = If | For | Func | Return | Try

type LeafNode = Def | Assign | Label | Break | Throw | AnyCode

type ChildNode = StartBlockNode | LeafNode

type EndBlockNodeType =
  | typeof If
  | typeof Else
  | typeof For
  | typeof Func
  | typeof Return
  | typeof Catch
  | typeof Finally

type Constants = Record<string, SafeExpr | undefined>

export interface CodeGenOptions {
  es5?: boolean
  lines?: boolean
  ownProperties?: boolean
}

interface CGOptions extends CodeGenOptions {
  _n: "\n" | ""
}

export class CodeGen {
  readonly _scope: Scope
  readonly _extScope: ValueScope
  readonly _values: ScopeValueSets = {}
  private readonly _nodes: ParentNode[]
  private readonly _blockStarts: number[] = []
  private readonly _constants: Constants = {}
  private readonly opts: CGOptions

  constructor(extScope: ValueScope, opts: CodeGenOptions = {}) {
    this.opts = {...opts, _n: opts.lines ? "\n" : ""}
    this._extScope = extScope
    this._scope = new Scope({parent: extScope})
    this._nodes = [new Root()]
  }

  toString(): string {
    return this._root.render(this.opts)
  }

  // returns unique name in the internal scope
  name(prefix: string): Name {
    return this._scope.name(prefix)
  }

  // reserves unique name in the external scope
  scopeName(prefix: string): ValueScopeName {
      throw new Error("STUB");
  }

  // reserves unique name in the external scope and assigns value to it
  scopeValue(prefixOrName: ValueScopeName | string, value: NameValue): Name {
    const name = this._extScope.value(prefixOrName, value)
    const vs = this._values[name.prefix] || (this._values[name.prefix] = new Set())
    vs.add(name)
    return name
  }

  getScopeValue(prefix: string, keyOrRef: unknown): ValueScopeName | undefined {
      throw new Error("STUB");
  }

  // return code that assigns values in the external scope to the names that are used internally
  // (same names that were returned by gen.scopeName or gen.scopeValue)
  scopeRefs(scopeName: Name): Code {
      throw new Error("STUB");
  }

  scopeCode(): Code {
    return this._extScope.scopeCode(this._values)
  }

  private _def(
    varKind: Name,
    nameOrPrefix: Name | string,
    rhs?: SafeExpr,
    constant?: boolean
  ): Name {
    const name = this._scope.toName(nameOrPrefix)
    if (rhs !== undefined && constant) this._constants[name.str] = rhs
    this._leafNode(new Def(varKind, name, rhs))
    return name
  }

  // `const` declaration (`var` in es5 mode)
  const(nameOrPrefix: Name | string, rhs: SafeExpr, _constant?: boolean): Name {
    return this._def(varKinds.const, nameOrPrefix, rhs, _constant)
  }

  // `let` declaration with optional assignment (`var` in es5 mode)
  let(nameOrPrefix: Name | string, rhs?: SafeExpr, _constant?: boolean): Name {
    return this._def(varKinds.let, nameOrPrefix, rhs, _constant)
  }

  // `var` declaration with optional assignment
  var(nameOrPrefix: Name | string, rhs?: SafeExpr, _constant?: boolean): Name {
    return this._def(varKinds.var, nameOrPrefix, rhs, _constant)
  }

  // assignment code
  assign(lhs: Code, rhs: SafeExpr, sideEffects?: boolean): CodeGen {
    return this._leafNode(new Assign(lhs, rhs, sideEffects))
  }

  // `+=` code
  add(lhs: Code, rhs: SafeExpr): CodeGen {
    return this._leafNode(new AssignOp(lhs, operators.ADD, rhs))
  }

  // appends passed SafeExpr to code or executes Block
  code(c: Block | SafeExpr): CodeGen {
    if (typeof c == "function") c()
    else if (c !== nil) this._leafNode(new AnyCode(c))
    return this
  }

  // returns code for object literal for the passed argument list of key-value pairs
  object(...keyValues: [Name | string, SafeExpr | string][]): _Code {
    const code: CodeItem[] = ["{"]
    for (const [key, value] of keyValues) {
      if (code.length > 1) code.push(",")
      code.push(key)
      if (key !== value || this.opts.es5) {
        code.push(":")
        addCodeArg(code, value)
      }
    }
    code.push("}")
    return new _Code(code)
  }

  // `if` clause (or statement if `thenBody` and, optionally, `elseBody` are passed)
  if(condition: Code | boolean, thenBody?: Block, elseBody?: Block): CodeGen {
    this._blockNode(new If(condition))

    if (thenBody && elseBody) {
      this.code(thenBody).else().code(elseBody).endIf()
    } else if (thenBody) {
      this.code(thenBody).endIf()
    } else if (elseBody) {
      throw new Error('CodeGen: "else" body without "then" body')
    }
    return this
  }

  // `else if` clause - invalid without `if` or after `else` clauses
  elseIf(condition: Code | boolean): CodeGen {
    return this._elseNode(new If(condition))
  }

  // `else` clause - only valid after `if` or `else if` clauses
  else(): CodeGen {
    return this._elseNode(new Else())
  }

  // end `if` statement (needed if gen.if was used only with condition)
  endIf(): CodeGen {
    return this._endBlockNode(If, Else)
  }

  private _for(node: For, forBody?: Block): CodeGen {
    this._blockNode(node)
    if (forBody) this.code(forBody).endFor()
    return this
  }

  // a generic `for` clause (or statement if `forBody` is passed)
  for(iteration: Code, forBody?: Block): CodeGen {
    return this._for(new ForLoop(iteration), forBody)
  }

  // `for` statement for a range of values
  forRange(
    nameOrPrefix: Name | string,
    from: SafeExpr,
    to: SafeExpr,
    forBody: (index: Name) => void,
    varKind: Code = this.opts.es5 ? varKinds.var : varKinds.let
  ): CodeGen {
    const name = this._scope.toName(nameOrPrefix)
    return this._for(new ForRange(varKind, name, from, to), () => { throw new Error("STUB"); })
  }

  // `for-of` statement (in es5 mode replace with a normal for loop)
  forOf(
    nameOrPrefix: Name | string,
    iterable: Code,
    forBody: (item: Name) => void,
    varKind: Code = varKinds.const
  ): CodeGen {
    const name = this._scope.toName(nameOrPrefix)
    if (this.opts.es5) {
      const arr = iterable instanceof Name ? iterable : this.var("_arr", iterable)
      return this.forRange("_i", 0, _`${arr}.length`, (i) => {
          throw new Error("STUB");
      })
    }
    return this._for(new ForIter("of", varKind, name, iterable), () => { throw new Error("STUB"); })
  }

  // `for-in` statement.
  // With option `ownProperties` replaced with a `for-of` loop for object keys
  forIn(
    nameOrPrefix: Name | string,
    obj: Code,
    forBody: (item: Name) => void,
    varKind: Code = this.opts.es5 ? varKinds.var : varKinds.const
  ): CodeGen {
    if (this.opts.ownProperties) {
      return this.forOf(nameOrPrefix, _`Object.keys(${obj})`, forBody)
    }
    const name = this._scope.toName(nameOrPrefix)
    return this._for(new ForIter("in", varKind, name, obj), () => { throw new Error("STUB"); })
  }

  // end `for` loop
  endFor(): CodeGen {
      throw new Error("STUB");
  }

  // `label` statement
  label(label: Name): CodeGen {
    return this._leafNode(new Label(label))
  }

  // `break` statement
  break(label?: Code): CodeGen {
    return this._leafNode(new Break(label))
  }

  // `return` statement
  return(value: Block | SafeExpr): CodeGen {
    const node = new Return()
    this._blockNode(node)
    this.code(value)
    if (node.nodes.length !== 1) throw new Error('CodeGen: "return" should have one node')
    return this._endBlockNode(Return)
  }

  // `try` statement
  try(tryBody: Block, catchCode?: (e: Name) => void, finallyCode?: Block): CodeGen {
    if (!catchCode && !finallyCode) throw new Error('CodeGen: "try" without "catch" and "finally"')
    const node = new Try()
    this._blockNode(node)
    this.code(tryBody)
    if (catchCode) {
      const error = this.name("e")
      this._currNode = node.catch = new Catch(error)
      catchCode(error)
    }
    if (finallyCode) {
      this._currNode = node.finally = new Finally()
      this.code(finallyCode)
    }
    return this._endBlockNode(Catch, Finally)
  }

  // `throw` statement
  throw(error: Code): CodeGen {
    return this._leafNode(new Throw(error))
  }

  // start self-balancing block
  block(body?: Block, nodeCount?: number): CodeGen {
    this._blockStarts.push(this._nodes.length)
    if (body) this.code(body).endBlock(nodeCount)
    return this
  }

  // end the current self-balancing block
  endBlock(nodeCount?: number): CodeGen {
      throw new Error("STUB");
  }

  // `function` heading (or definition if funcBody is passed)
  func(name: Name, args: Code = nil, async?: boolean, funcBody?: Block): CodeGen {
      throw new Error("STUB");
  }

  // end function definition
  endFunc(): CodeGen {
      throw new Error("STUB");
  }

  optimize(n = 1): void {
      throw new Error("STUB");
  }

  private _leafNode(node: LeafNode): CodeGen {
    this._currNode.nodes.push(node)
    return this
  }

  private _blockNode(node: StartBlockNode): void {
    this._currNode.nodes.push(node)
    this._nodes.push(node)
  }

  private _endBlockNode(N1: EndBlockNodeType, N2?: EndBlockNodeType): CodeGen {
    const n = this._currNode
    if (n instanceof N1 || (N2 && n instanceof N2)) {
      this._nodes.pop()
      return this
    }
    throw new Error(`CodeGen: not in block "${N2 ? `${N1.kind}/${N2.kind}` : N1.kind}"`)
  }

  private _elseNode(node: If | Else): CodeGen {
    const n = this._currNode
    if (!(n instanceof If)) {
      throw new Error('CodeGen: "else" without "if"')
    }
    this._currNode = n.else = node
    return this
  }

  private get _root(): Root {
      throw new Error("STUB");
  }

  private get _currNode(): ParentNode {
      throw new Error("STUB");
  }

  private set _currNode(node: ParentNode) {
      throw new Error("STUB");
  }

  // get nodeCount(): number {
  //   return this._root.count
  // }
}

function addNames(names: UsedNames, from: UsedNames): UsedNames {
    throw new Error("STUB");
}

function addExprNames(names: UsedNames, from: SafeExpr): UsedNames {
    throw new Error("STUB");
}

function optimizeExpr<T extends SafeExpr | Code>(expr: T, names: UsedNames, constants: Constants): T
function optimizeExpr(expr: SafeExpr, names: UsedNames, constants: Constants): SafeExpr {
    throw new Error("STUB");
}

function subtractNames(names: UsedNames, from: UsedNames): void {
    throw new Error("STUB");
}

export function not<T extends Code | SafeExpr>(x: T): T
export function not(x: Code | SafeExpr): Code | SafeExpr {
  return typeof x == "boolean" || typeof x == "number" || x === null ? !x : _`!${par(x)}`
}

const andCode = mappend(operators.AND)

// boolean AND (&&) expression with the passed arguments
export function and(...args: Code[]): Code {
  return args.reduce(andCode)
}

const orCode = mappend(operators.OR)

// boolean OR (||) expression with the passed arguments
export function or(...args: Code[]): Code {
  return args.reduce(orCode)
}

type MAppend = (x: Code, y: Code) => Code

function mappend(op: Code): MAppend {
  return (x, y) => { throw new Error("STUB"); }
}

function par(x: Code): Code {
  return x instanceof Name ? x : _`(${x})`
}
