import { 
    Cell,
    Slice, 
    Address, 
    Builder, 
    beginCell, 
    ComputeError, 
    TupleItem, 
    TupleReader, 
    Dictionary, 
    contractAddress, 
    address, 
    ContractProvider, 
    Sender, 
    Contract, 
    ContractABI, 
    ABIType,
    ABIGetter,
    ABIReceiver,
    TupleBuilder,
    DictionaryValue
} from '@ton/core';

export type DataSize = {
    $$type: 'DataSize';
    cells: bigint;
    bits: bigint;
    refs: bigint;
}

export function storeDataSize(src: DataSize) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.cells, 257);
        b_0.storeInt(src.bits, 257);
        b_0.storeInt(src.refs, 257);
    };
}

export function loadDataSize(slice: Slice) {
    const sc_0 = slice;
    const _cells = sc_0.loadIntBig(257);
    const _bits = sc_0.loadIntBig(257);
    const _refs = sc_0.loadIntBig(257);
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function loadGetterTupleDataSize(source: TupleReader) {
    const _cells = source.readBigNumber();
    const _bits = source.readBigNumber();
    const _refs = source.readBigNumber();
    return { $$type: 'DataSize' as const, cells: _cells, bits: _bits, refs: _refs };
}

function storeTupleDataSize(source: DataSize) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.cells);
    builder.writeNumber(source.bits);
    builder.writeNumber(source.refs);
    return builder.build();
}

function dictValueParserDataSize(): DictionaryValue<DataSize> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDataSize(src)).endCell());
        },
        parse: (src) => {
            return loadDataSize(src.loadRef().beginParse());
        }
    }
}

export type StateInit = {
    $$type: 'StateInit';
    code: Cell;
    data: Cell;
}

export function storeStateInit(src: StateInit) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.code);
        b_0.storeRef(src.data);
    };
}

export function loadStateInit(slice: Slice) {
    const sc_0 = slice;
    const _code = sc_0.loadRef();
    const _data = sc_0.loadRef();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function loadGetterTupleStateInit(source: TupleReader) {
    const _code = source.readCell();
    const _data = source.readCell();
    return { $$type: 'StateInit' as const, code: _code, data: _data };
}

function storeTupleStateInit(source: StateInit) {
    const builder = new TupleBuilder();
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    return builder.build();
}

function dictValueParserStateInit(): DictionaryValue<StateInit> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStateInit(src)).endCell());
        },
        parse: (src) => {
            return loadStateInit(src.loadRef().beginParse());
        }
    }
}

export type Context = {
    $$type: 'Context';
    bounceable: boolean;
    sender: Address;
    value: bigint;
    raw: Slice;
}

export function storeContext(src: Context) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.bounceable);
        b_0.storeAddress(src.sender);
        b_0.storeInt(src.value, 257);
        b_0.storeRef(src.raw.asCell());
    };
}

export function loadContext(slice: Slice) {
    const sc_0 = slice;
    const _bounceable = sc_0.loadBit();
    const _sender = sc_0.loadAddress();
    const _value = sc_0.loadIntBig(257);
    const _raw = sc_0.loadRef().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function loadGetterTupleContext(source: TupleReader) {
    const _bounceable = source.readBoolean();
    const _sender = source.readAddress();
    const _value = source.readBigNumber();
    const _raw = source.readCell().asSlice();
    return { $$type: 'Context' as const, bounceable: _bounceable, sender: _sender, value: _value, raw: _raw };
}

function storeTupleContext(source: Context) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.bounceable);
    builder.writeAddress(source.sender);
    builder.writeNumber(source.value);
    builder.writeSlice(source.raw.asCell());
    return builder.build();
}

function dictValueParserContext(): DictionaryValue<Context> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeContext(src)).endCell());
        },
        parse: (src) => {
            return loadContext(src.loadRef().beginParse());
        }
    }
}

export type SendParameters = {
    $$type: 'SendParameters';
    mode: bigint;
    body: Cell | null;
    code: Cell | null;
    data: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeSendParameters(src: SendParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadSendParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleSendParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'SendParameters' as const, mode: _mode, body: _body, code: _code, data: _data, value: _value, to: _to, bounce: _bounce };
}

function storeTupleSendParameters(source: SendParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserSendParameters(): DictionaryValue<SendParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSendParameters(src)).endCell());
        },
        parse: (src) => {
            return loadSendParameters(src.loadRef().beginParse());
        }
    }
}

export type MessageParameters = {
    $$type: 'MessageParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    to: Address;
    bounce: boolean;
}

export function storeMessageParameters(src: MessageParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeAddress(src.to);
        b_0.storeBit(src.bounce);
    };
}

export function loadMessageParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _to = sc_0.loadAddress();
    const _bounce = sc_0.loadBit();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function loadGetterTupleMessageParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _to = source.readAddress();
    const _bounce = source.readBoolean();
    return { $$type: 'MessageParameters' as const, mode: _mode, body: _body, value: _value, to: _to, bounce: _bounce };
}

function storeTupleMessageParameters(source: MessageParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeAddress(source.to);
    builder.writeBoolean(source.bounce);
    return builder.build();
}

function dictValueParserMessageParameters(): DictionaryValue<MessageParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMessageParameters(src)).endCell());
        },
        parse: (src) => {
            return loadMessageParameters(src.loadRef().beginParse());
        }
    }
}

export type DeployParameters = {
    $$type: 'DeployParameters';
    mode: bigint;
    body: Cell | null;
    value: bigint;
    bounce: boolean;
    init: StateInit;
}

export function storeDeployParameters(src: DeployParameters) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.mode, 257);
        if (src.body !== null && src.body !== undefined) { b_0.storeBit(true).storeRef(src.body); } else { b_0.storeBit(false); }
        b_0.storeInt(src.value, 257);
        b_0.storeBit(src.bounce);
        b_0.store(storeStateInit(src.init));
    };
}

export function loadDeployParameters(slice: Slice) {
    const sc_0 = slice;
    const _mode = sc_0.loadIntBig(257);
    const _body = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _value = sc_0.loadIntBig(257);
    const _bounce = sc_0.loadBit();
    const _init = loadStateInit(sc_0);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function loadGetterTupleDeployParameters(source: TupleReader) {
    const _mode = source.readBigNumber();
    const _body = source.readCellOpt();
    const _value = source.readBigNumber();
    const _bounce = source.readBoolean();
    const _init = loadGetterTupleStateInit(source);
    return { $$type: 'DeployParameters' as const, mode: _mode, body: _body, value: _value, bounce: _bounce, init: _init };
}

function storeTupleDeployParameters(source: DeployParameters) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.mode);
    builder.writeCell(source.body);
    builder.writeNumber(source.value);
    builder.writeBoolean(source.bounce);
    builder.writeTuple(storeTupleStateInit(source.init));
    return builder.build();
}

function dictValueParserDeployParameters(): DictionaryValue<DeployParameters> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployParameters(src)).endCell());
        },
        parse: (src) => {
            return loadDeployParameters(src.loadRef().beginParse());
        }
    }
}

export type StdAddress = {
    $$type: 'StdAddress';
    workchain: bigint;
    address: bigint;
}

export function storeStdAddress(src: StdAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 8);
        b_0.storeUint(src.address, 256);
    };
}

export function loadStdAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(8);
    const _address = sc_0.loadUintBig(256);
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleStdAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readBigNumber();
    return { $$type: 'StdAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleStdAddress(source: StdAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeNumber(source.address);
    return builder.build();
}

function dictValueParserStdAddress(): DictionaryValue<StdAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeStdAddress(src)).endCell());
        },
        parse: (src) => {
            return loadStdAddress(src.loadRef().beginParse());
        }
    }
}

export type VarAddress = {
    $$type: 'VarAddress';
    workchain: bigint;
    address: Slice;
}

export function storeVarAddress(src: VarAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.workchain, 32);
        b_0.storeRef(src.address.asCell());
    };
}

export function loadVarAddress(slice: Slice) {
    const sc_0 = slice;
    const _workchain = sc_0.loadIntBig(32);
    const _address = sc_0.loadRef().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function loadGetterTupleVarAddress(source: TupleReader) {
    const _workchain = source.readBigNumber();
    const _address = source.readCell().asSlice();
    return { $$type: 'VarAddress' as const, workchain: _workchain, address: _address };
}

function storeTupleVarAddress(source: VarAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.workchain);
    builder.writeSlice(source.address.asCell());
    return builder.build();
}

function dictValueParserVarAddress(): DictionaryValue<VarAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeVarAddress(src)).endCell());
        },
        parse: (src) => {
            return loadVarAddress(src.loadRef().beginParse());
        }
    }
}

export type BasechainAddress = {
    $$type: 'BasechainAddress';
    hash: bigint | null;
}

export function storeBasechainAddress(src: BasechainAddress) {
    return (builder: Builder) => {
        const b_0 = builder;
        if (src.hash !== null && src.hash !== undefined) { b_0.storeBit(true).storeInt(src.hash, 257); } else { b_0.storeBit(false); }
    };
}

export function loadBasechainAddress(slice: Slice) {
    const sc_0 = slice;
    const _hash = sc_0.loadBit() ? sc_0.loadIntBig(257) : null;
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function loadGetterTupleBasechainAddress(source: TupleReader) {
    const _hash = source.readBigNumberOpt();
    return { $$type: 'BasechainAddress' as const, hash: _hash };
}

function storeTupleBasechainAddress(source: BasechainAddress) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.hash);
    return builder.build();
}

function dictValueParserBasechainAddress(): DictionaryValue<BasechainAddress> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeBasechainAddress(src)).endCell());
        },
        parse: (src) => {
            return loadBasechainAddress(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwner = {
    $$type: 'ChangeOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwner(src: ChangeOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2174598809, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2174598809) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwner(source: ChangeOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwner(): DictionaryValue<ChangeOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwner(src.loadRef().beginParse());
        }
    }
}

export type ChangeOwnerOk = {
    $$type: 'ChangeOwnerOk';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeOwnerOk(src: ChangeOwnerOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(846932810, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeOwnerOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 846932810) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeOwnerOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeOwnerOk' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeOwnerOk(source: ChangeOwnerOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeOwnerOk(): DictionaryValue<ChangeOwnerOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeOwnerOk(src)).endCell());
        },
        parse: (src) => {
            return loadChangeOwnerOk(src.loadRef().beginParse());
        }
    }
}

export type Deploy = {
    $$type: 'Deploy';
    queryId: bigint;
}

export function storeDeploy(src: Deploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2490013878, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2490013878) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function loadGetterTupleDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Deploy' as const, queryId: _queryId };
}

function storeTupleDeploy(source: Deploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeploy(): DictionaryValue<Deploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadDeploy(src.loadRef().beginParse());
        }
    }
}

export type DeployOk = {
    $$type: 'DeployOk';
    queryId: bigint;
}

export function storeDeployOk(src: DeployOk) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2952335191, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadDeployOk(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2952335191) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function loadGetterTupleDeployOk(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'DeployOk' as const, queryId: _queryId };
}

function storeTupleDeployOk(source: DeployOk) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserDeployOk(): DictionaryValue<DeployOk> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeDeployOk(src)).endCell());
        },
        parse: (src) => {
            return loadDeployOk(src.loadRef().beginParse());
        }
    }
}

export type FactoryDeploy = {
    $$type: 'FactoryDeploy';
    queryId: bigint;
    cashback: Address;
}

export function storeFactoryDeploy(src: FactoryDeploy) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1829761339, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.cashback);
    };
}

export function loadFactoryDeploy(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1829761339) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _cashback = sc_0.loadAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function loadGetterTupleFactoryDeploy(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _cashback = source.readAddress();
    return { $$type: 'FactoryDeploy' as const, queryId: _queryId, cashback: _cashback };
}

function storeTupleFactoryDeploy(source: FactoryDeploy) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.cashback);
    return builder.build();
}

function dictValueParserFactoryDeploy(): DictionaryValue<FactoryDeploy> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeFactoryDeploy(src)).endCell());
        },
        parse: (src) => {
            return loadFactoryDeploy(src.loadRef().beginParse());
        }
    }
}

export type Excesses = {
    $$type: 'Excesses';
    queryId: bigint;
}

export function storeExcesses(src: Excesses) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3576854235, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadExcesses(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3576854235) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function loadGetterTupleExcesses(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'Excesses' as const, queryId: _queryId };
}

function storeTupleExcesses(source: Excesses) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserExcesses(): DictionaryValue<Excesses> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeExcesses(src)).endCell());
        },
        parse: (src) => {
            return loadExcesses(src.loadRef().beginParse());
        }
    }
}

export type GetRoyaltyParams = {
    $$type: 'GetRoyaltyParams';
    queryId: bigint;
}

export function storeGetRoyaltyParams(src: GetRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1765620048, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1765620048) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function loadTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function loadGetterTupleGetRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetRoyaltyParams' as const, queryId: _queryId };
}

function storeTupleGetRoyaltyParams(source: GetRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetRoyaltyParams(): DictionaryValue<GetRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadGetRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type ReportRoyaltyParams = {
    $$type: 'ReportRoyaltyParams';
    queryId: bigint;
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeReportRoyaltyParams(src: ReportRoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2831876269, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.numerator, 16);
        b_0.storeCoins(src.denominator);
        b_0.storeAddress(src.destination);
    };
}

export function loadReportRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2831876269) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _numerator = sc_0.loadUintBig(16);
    const _denominator = sc_0.loadCoins();
    const _destination = sc_0.loadAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleReportRoyaltyParams(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'ReportRoyaltyParams' as const, queryId: _queryId, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleReportRoyaltyParams(source: ReportRoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserReportRoyaltyParams(): DictionaryValue<ReportRoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadReportRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type NFTTransfer = {
    $$type: 'NFTTransfer';
    queryId: bigint;
    newOwner: Address;
    responseDestination: Address;
    customPayload: Cell | null;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeNFTTransfer(src: NFTTransfer) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1607220500, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
        b_0.storeAddress(src.responseDestination);
        if (src.customPayload !== null && src.customPayload !== undefined) { b_0.storeBit(true).storeRef(src.customPayload); } else { b_0.storeBit(false); }
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadNFTTransfer(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1607220500) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _customPayload = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleNFTTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleNFTTransfer(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    const _responseDestination = source.readAddress();
    const _customPayload = source.readCellOpt();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'NFTTransfer' as const, queryId: _queryId, newOwner: _newOwner, responseDestination: _responseDestination, customPayload: _customPayload, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleNFTTransfer(source: NFTTransfer) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    builder.writeAddress(source.responseDestination);
    builder.writeCell(source.customPayload);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserNFTTransfer(): DictionaryValue<NFTTransfer> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNFTTransfer(src)).endCell());
        },
        parse: (src) => {
            return loadNFTTransfer(src.loadRef().beginParse());
        }
    }
}

export type OwnershipAssigned = {
    $$type: 'OwnershipAssigned';
    queryId: bigint;
    prevOwner: Address;
    forwardPayload: Cell;
}

export function storeOwnershipAssigned(src: OwnershipAssigned) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(85167505, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.prevOwner);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadOwnershipAssigned(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 85167505) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _prevOwner = sc_0.loadAddress();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function loadTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function loadGetterTupleOwnershipAssigned(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _prevOwner = source.readAddress();
    const _forwardPayload = source.readCell();
    return { $$type: 'OwnershipAssigned' as const, queryId: _queryId, prevOwner: _prevOwner, forwardPayload: _forwardPayload };
}

function storeTupleOwnershipAssigned(source: OwnershipAssigned) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.prevOwner);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserOwnershipAssigned(): DictionaryValue<OwnershipAssigned> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeOwnershipAssigned(src)).endCell());
        },
        parse: (src) => {
            return loadOwnershipAssigned(src.loadRef().beginParse());
        }
    }
}

export type GetStaticData = {
    $$type: 'GetStaticData';
    queryId: bigint;
}

export function storeGetStaticData(src: GetStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(801842850, 32);
        b_0.storeUint(src.queryId, 64);
    };
}

export function loadGetStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 801842850) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function loadGetterTupleGetStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    return { $$type: 'GetStaticData' as const, queryId: _queryId };
}

function storeTupleGetStaticData(source: GetStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    return builder.build();
}

function dictValueParserGetStaticData(): DictionaryValue<GetStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadGetStaticData(src.loadRef().beginParse());
        }
    }
}

export type ReportStaticData = {
    $$type: 'ReportStaticData';
    queryId: bigint;
    index: bigint;
    collection: Address;
}

export function storeReportStaticData(src: ReportStaticData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(2339837749, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collection);
    };
}

export function loadReportStaticData(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 2339837749) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _index = sc_0.loadUintBig(256);
    const _collection = sc_0.loadAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function loadTupleReportStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function loadGetterTupleReportStaticData(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _index = source.readBigNumber();
    const _collection = source.readAddress();
    return { $$type: 'ReportStaticData' as const, queryId: _queryId, index: _index, collection: _collection };
}

function storeTupleReportStaticData(source: ReportStaticData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collection);
    return builder.build();
}

function dictValueParserReportStaticData(): DictionaryValue<ReportStaticData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeReportStaticData(src)).endCell());
        },
        parse: (src) => {
            return loadReportStaticData(src.loadRef().beginParse());
        }
    }
}

export type GetNftData = {
    $$type: 'GetNftData';
    init: boolean;
    index: bigint;
    collectionAddress: Address;
    ownerAddress: Address;
    individualContent: Cell;
}

export function storeGetNftData(src: GetNftData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeBit(src.init);
        b_0.storeUint(src.index, 256);
        b_0.storeAddress(src.collectionAddress);
        b_0.storeAddress(src.ownerAddress);
        b_0.storeRef(src.individualContent);
    };
}

export function loadGetNftData(slice: Slice) {
    const sc_0 = slice;
    const _init = sc_0.loadBit();
    const _index = sc_0.loadUintBig(256);
    const _collectionAddress = sc_0.loadAddress();
    const _ownerAddress = sc_0.loadAddress();
    const _individualContent = sc_0.loadRef();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function loadTupleGetNftData(source: TupleReader) {
    const _init = source.readBoolean();
    const _index = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _ownerAddress = source.readAddress();
    const _individualContent = source.readCell();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function loadGetterTupleGetNftData(source: TupleReader) {
    const _init = source.readBoolean();
    const _index = source.readBigNumber();
    const _collectionAddress = source.readAddress();
    const _ownerAddress = source.readAddress();
    const _individualContent = source.readCell();
    return { $$type: 'GetNftData' as const, init: _init, index: _index, collectionAddress: _collectionAddress, ownerAddress: _ownerAddress, individualContent: _individualContent };
}

function storeTupleGetNftData(source: GetNftData) {
    const builder = new TupleBuilder();
    builder.writeBoolean(source.init);
    builder.writeNumber(source.index);
    builder.writeAddress(source.collectionAddress);
    builder.writeAddress(source.ownerAddress);
    builder.writeCell(source.individualContent);
    return builder.build();
}

function dictValueParserGetNftData(): DictionaryValue<GetNftData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeGetNftData(src)).endCell());
        },
        parse: (src) => {
            return loadGetNftData(src.loadRef().beginParse());
        }
    }
}

export type CollectionData = {
    $$type: 'CollectionData';
    nextItemIndex: bigint;
    collectionContent: Cell;
    ownerAddress: Address;
}

export function storeCollectionData(src: CollectionData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.nextItemIndex, 257);
        b_0.storeRef(src.collectionContent);
        b_0.storeAddress(src.ownerAddress);
    };
}

export function loadCollectionData(slice: Slice) {
    const sc_0 = slice;
    const _nextItemIndex = sc_0.loadIntBig(257);
    const _collectionContent = sc_0.loadRef();
    const _ownerAddress = sc_0.loadAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function loadTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _ownerAddress = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function loadGetterTupleCollectionData(source: TupleReader) {
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _ownerAddress = source.readAddress();
    return { $$type: 'CollectionData' as const, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, ownerAddress: _ownerAddress };
}

function storeTupleCollectionData(source: CollectionData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeAddress(source.ownerAddress);
    return builder.build();
}

function dictValueParserCollectionData(): DictionaryValue<CollectionData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeCollectionData(src)).endCell());
        },
        parse: (src) => {
            return loadCollectionData(src.loadRef().beginParse());
        }
    }
}

export type RoyaltyParams = {
    $$type: 'RoyaltyParams';
    numerator: bigint;
    denominator: bigint;
    destination: Address;
}

export function storeRoyaltyParams(src: RoyaltyParams) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeInt(src.numerator, 257);
        b_0.storeInt(src.denominator, 257);
        b_0.storeAddress(src.destination);
    };
}

export function loadRoyaltyParams(slice: Slice) {
    const sc_0 = slice;
    const _numerator = sc_0.loadIntBig(257);
    const _denominator = sc_0.loadIntBig(257);
    const _destination = sc_0.loadAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function loadGetterTupleRoyaltyParams(source: TupleReader) {
    const _numerator = source.readBigNumber();
    const _denominator = source.readBigNumber();
    const _destination = source.readAddress();
    return { $$type: 'RoyaltyParams' as const, numerator: _numerator, denominator: _denominator, destination: _destination };
}

function storeTupleRoyaltyParams(source: RoyaltyParams) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.numerator);
    builder.writeNumber(source.denominator);
    builder.writeAddress(source.destination);
    return builder.build();
}

function dictValueParserRoyaltyParams(): DictionaryValue<RoyaltyParams> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeRoyaltyParams(src)).endCell());
        },
        parse: (src) => {
            return loadRoyaltyParams(src.loadRef().beginParse());
        }
    }
}

export type Tep64TokenData = {
    $$type: 'Tep64TokenData';
    flag: bigint;
    content: string;
}

export function storeTep64TokenData(src: Tep64TokenData) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.flag, 8);
        b_0.storeStringRefTail(src.content);
    };
}

export function loadTep64TokenData(slice: Slice) {
    const sc_0 = slice;
    const _flag = sc_0.loadUintBig(8);
    const _content = sc_0.loadStringRefTail();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function loadTupleTep64TokenData(source: TupleReader) {
    const _flag = source.readBigNumber();
    const _content = source.readString();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function loadGetterTupleTep64TokenData(source: TupleReader) {
    const _flag = source.readBigNumber();
    const _content = source.readString();
    return { $$type: 'Tep64TokenData' as const, flag: _flag, content: _content };
}

function storeTupleTep64TokenData(source: Tep64TokenData) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.flag);
    builder.writeString(source.content);
    return builder.build();
}

function dictValueParserTep64TokenData(): DictionaryValue<Tep64TokenData> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeTep64TokenData(src)).endCell());
        },
        parse: (src) => {
            return loadTep64TokenData(src.loadRef().beginParse());
        }
    }
}

export type SetStaticTax = {
    $$type: 'SetStaticTax';
    staticTax: bigint;
}

export function storeSetStaticTax(src: SetStaticTax) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(352953376, 32);
        b_0.storeCoins(src.staticTax);
    };
}

export function loadSetStaticTax(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 352953376) { throw Error('Invalid prefix'); }
    const _staticTax = sc_0.loadCoins();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function loadTupleSetStaticTax(source: TupleReader) {
    const _staticTax = source.readBigNumber();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function loadGetterTupleSetStaticTax(source: TupleReader) {
    const _staticTax = source.readBigNumber();
    return { $$type: 'SetStaticTax' as const, staticTax: _staticTax };
}

function storeTupleSetStaticTax(source: SetStaticTax) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.staticTax);
    return builder.build();
}

function dictValueParserSetStaticTax(): DictionaryValue<SetStaticTax> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeSetStaticTax(src)).endCell());
        },
        parse: (src) => {
            return loadSetStaticTax(src.loadRef().beginParse());
        }
    }
}

export type UpgradeContract = {
    $$type: 'UpgradeContract';
    queryId: bigint;
    code: Cell | null;
    data: Cell | null;
    responseDestination: Address;
}

export function storeUpgradeContract(src: UpgradeContract) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(288003337, 32);
        b_0.storeInt(src.queryId, 257);
        if (src.code !== null && src.code !== undefined) { b_0.storeBit(true).storeRef(src.code); } else { b_0.storeBit(false); }
        if (src.data !== null && src.data !== undefined) { b_0.storeBit(true).storeRef(src.data); } else { b_0.storeBit(false); }
        b_0.storeAddress(src.responseDestination);
    };
}

export function loadUpgradeContract(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 288003337) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadIntBig(257);
    const _code = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _data = sc_0.loadBit() ? sc_0.loadRef() : null;
    const _responseDestination = sc_0.loadAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadTupleUpgradeContract(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function loadGetterTupleUpgradeContract(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _code = source.readCellOpt();
    const _data = source.readCellOpt();
    const _responseDestination = source.readAddress();
    return { $$type: 'UpgradeContract' as const, queryId: _queryId, code: _code, data: _data, responseDestination: _responseDestination };
}

function storeTupleUpgradeContract(source: UpgradeContract) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeCell(source.code);
    builder.writeCell(source.data);
    builder.writeAddress(source.responseDestination);
    return builder.build();
}

function dictValueParserUpgradeContract(): DictionaryValue<UpgradeContract> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpgradeContract(src)).endCell());
        },
        parse: (src) => {
            return loadUpgradeContract(src.loadRef().beginParse());
        }
    }
}

export type MerkleProof = {
    $$type: 'MerkleProof';
    data: Cell;
    root: bigint;
    proof: Dictionary<number, bigint>;
    proofLen: bigint;
}

export function storeMerkleProof(src: MerkleProof) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeRef(src.data);
        b_0.storeUint(src.root, 256);
        b_0.storeDict(src.proof, Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256));
        b_0.storeUint(src.proofLen, 32);
    };
}

export function loadMerkleProof(slice: Slice) {
    const sc_0 = slice;
    const _data = sc_0.loadRef();
    const _root = sc_0.loadUintBig(256);
    const _proof = Dictionary.load(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), sc_0);
    const _proofLen = sc_0.loadUintBig(32);
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function loadTupleMerkleProof(source: TupleReader) {
    const _data = source.readCell();
    const _root = source.readBigNumber();
    const _proof = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), source.readCellOpt());
    const _proofLen = source.readBigNumber();
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function loadGetterTupleMerkleProof(source: TupleReader) {
    const _data = source.readCell();
    const _root = source.readBigNumber();
    const _proof = Dictionary.loadDirect(Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256), source.readCellOpt());
    const _proofLen = source.readBigNumber();
    return { $$type: 'MerkleProof' as const, data: _data, root: _root, proof: _proof, proofLen: _proofLen };
}

function storeTupleMerkleProof(source: MerkleProof) {
    const builder = new TupleBuilder();
    builder.writeCell(source.data);
    builder.writeNumber(source.root);
    builder.writeCell(source.proof.size > 0 ? beginCell().storeDictDirect(source.proof, Dictionary.Keys.Uint(32), Dictionary.Values.BigUint(256)).endCell() : null);
    builder.writeNumber(source.proofLen);
    return builder.build();
}

function dictValueParserMerkleProof(): DictionaryValue<MerkleProof> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMerkleProof(src)).endCell());
        },
        parse: (src) => {
            return loadMerkleProof(src.loadRef().beginParse());
        }
    }
}

export type MintNFT = {
    $$type: 'MintNFT';
    queryId: bigint;
    receiver: Address;
    responseDestination: Address;
    forwardAmount: bigint;
    forwardPayload: Cell;
}

export function storeMintNFT(src: MintNFT) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3845502486, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.receiver);
        b_0.storeAddress(src.responseDestination);
        b_0.storeCoins(src.forwardAmount);
        b_0.storeBuilder(src.forwardPayload.asBuilder());
    };
}

export function loadMintNFT(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3845502486) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _receiver = sc_0.loadAddress();
    const _responseDestination = sc_0.loadAddress();
    const _forwardAmount = sc_0.loadCoins();
    const _forwardPayload = sc_0.asCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadTupleMintNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function loadGetterTupleMintNFT(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _receiver = source.readAddress();
    const _responseDestination = source.readAddress();
    const _forwardAmount = source.readBigNumber();
    const _forwardPayload = source.readCell();
    return { $$type: 'MintNFT' as const, queryId: _queryId, receiver: _receiver, responseDestination: _responseDestination, forwardAmount: _forwardAmount, forwardPayload: _forwardPayload };
}

function storeTupleMintNFT(source: MintNFT) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.receiver);
    builder.writeAddress(source.responseDestination);
    builder.writeNumber(source.forwardAmount);
    builder.writeCell(source.forwardPayload);
    return builder.build();
}

function dictValueParserMintNFT(): DictionaryValue<MintNFT> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeMintNFT(src)).endCell());
        },
        parse: (src) => {
            return loadMintNFT(src.loadRef().beginParse());
        }
    }
}

export type UpdateCollection = {
    $$type: 'UpdateCollection';
    queryId: bigint;
    responseDestination: Address;
    collectionContent: Tep64TokenData | null;
    itemContentUrlPrefix: string | null;
    royalty: RoyaltyParams | null;
}

export function storeUpdateCollection(src: UpdateCollection) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(1218840839, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.responseDestination);
        if (src.collectionContent !== null && src.collectionContent !== undefined) { b_0.storeBit(true); b_0.store(storeTep64TokenData(src.collectionContent)); } else { b_0.storeBit(false); }
        if (src.itemContentUrlPrefix !== null && src.itemContentUrlPrefix !== undefined) { b_0.storeBit(true).storeStringRefTail(src.itemContentUrlPrefix); } else { b_0.storeBit(false); }
        const b_1 = new Builder();
        if (src.royalty !== null && src.royalty !== undefined) { b_1.storeBit(true); b_1.store(storeRoyaltyParams(src.royalty)); } else { b_1.storeBit(false); }
        b_0.storeRef(b_1.endCell());
    };
}

export function loadUpdateCollection(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 1218840839) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _responseDestination = sc_0.loadAddress();
    const _collectionContent = sc_0.loadBit() ? loadTep64TokenData(sc_0) : null;
    const _itemContentUrlPrefix = sc_0.loadBit() ? sc_0.loadStringRefTail() : null;
    const sc_1 = sc_0.loadRef().beginParse();
    const _royalty = sc_1.loadBit() ? loadRoyaltyParams(sc_1) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadTupleUpdateCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _collectionContent_p = source.readTupleOpt();
    const _collectionContent = _collectionContent_p ? loadTupleTep64TokenData(_collectionContent_p) : null;
    const _itemContentUrlPrefix = source.readStringOpt();
    const _royalty_p = source.readTupleOpt();
    const _royalty = _royalty_p ? loadTupleRoyaltyParams(_royalty_p) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadGetterTupleUpdateCollection(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _responseDestination = source.readAddress();
    const _collectionContent_p = source.readTupleOpt();
    const _collectionContent = _collectionContent_p ? loadTupleTep64TokenData(_collectionContent_p) : null;
    const _itemContentUrlPrefix = source.readStringOpt();
    const _royalty_p = source.readTupleOpt();
    const _royalty = _royalty_p ? loadTupleRoyaltyParams(_royalty_p) : null;
    return { $$type: 'UpdateCollection' as const, queryId: _queryId, responseDestination: _responseDestination, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function storeTupleUpdateCollection(source: UpdateCollection) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.responseDestination);
    if (source.collectionContent !== null && source.collectionContent !== undefined) {
        builder.writeTuple(storeTupleTep64TokenData(source.collectionContent));
    } else {
        builder.writeTuple(null);
    }
    builder.writeString(source.itemContentUrlPrefix);
    if (source.royalty !== null && source.royalty !== undefined) {
        builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    } else {
        builder.writeTuple(null);
    }
    return builder.build();
}

function dictValueParserUpdateCollection(): DictionaryValue<UpdateCollection> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeUpdateCollection(src)).endCell());
        },
        parse: (src) => {
            return loadUpdateCollection(src.loadRef().beginParse());
        }
    }
}

export type NftItemInitForwardPayload = {
    $$type: 'NftItemInitForwardPayload';
    index: bigint;
}

export function storeNftItemInitForwardPayload(src: NftItemInitForwardPayload) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(src.index, 256);
    };
}

export function loadNftItemInitForwardPayload(slice: Slice) {
    const sc_0 = slice;
    const _index = sc_0.loadUintBig(256);
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function loadTupleNftItemInitForwardPayload(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function loadGetterTupleNftItemInitForwardPayload(source: TupleReader) {
    const _index = source.readBigNumber();
    return { $$type: 'NftItemInitForwardPayload' as const, index: _index };
}

function storeTupleNftItemInitForwardPayload(source: NftItemInitForwardPayload) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.index);
    return builder.build();
}

function dictValueParserNftItemInitForwardPayload(): DictionaryValue<NftItemInitForwardPayload> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftItemInitForwardPayload(src)).endCell());
        },
        parse: (src) => {
            return loadNftItemInitForwardPayload(src.loadRef().beginParse());
        }
    }
}

export type ChangeCollectionOwner = {
    $$type: 'ChangeCollectionOwner';
    queryId: bigint;
    newOwner: Address;
}

export function storeChangeCollectionOwner(src: ChangeCollectionOwner) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeUint(3, 32);
        b_0.storeUint(src.queryId, 64);
        b_0.storeAddress(src.newOwner);
    };
}

export function loadChangeCollectionOwner(slice: Slice) {
    const sc_0 = slice;
    if (sc_0.loadUint(32) !== 3) { throw Error('Invalid prefix'); }
    const _queryId = sc_0.loadUintBig(64);
    const _newOwner = sc_0.loadAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadTupleChangeCollectionOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function loadGetterTupleChangeCollectionOwner(source: TupleReader) {
    const _queryId = source.readBigNumber();
    const _newOwner = source.readAddress();
    return { $$type: 'ChangeCollectionOwner' as const, queryId: _queryId, newOwner: _newOwner };
}

function storeTupleChangeCollectionOwner(source: ChangeCollectionOwner) {
    const builder = new TupleBuilder();
    builder.writeNumber(source.queryId);
    builder.writeAddress(source.newOwner);
    return builder.build();
}

function dictValueParserChangeCollectionOwner(): DictionaryValue<ChangeCollectionOwner> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeChangeCollectionOwner(src)).endCell());
        },
        parse: (src) => {
            return loadChangeCollectionOwner(src.loadRef().beginParse());
        }
    }
}

export type NftCollectionTemplate$Data = {
    $$type: 'NftCollectionTemplate$Data';
    owner: Address;
    staticTax: bigint;
    lockedValue: bigint;
    nextItemIndex: bigint;
    collectionContent: Cell;
    itemContentUrlPrefix: string;
    royalty: RoyaltyParams;
}

export function storeNftCollectionTemplate$Data(src: NftCollectionTemplate$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        b_0.storeUint(src.nextItemIndex, 256);
        b_0.storeRef(src.collectionContent);
        b_0.storeStringRefTail(src.itemContentUrlPrefix);
        const b_1 = new Builder();
        b_1.store(storeRoyaltyParams(src.royalty));
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNftCollectionTemplate$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _staticTax = sc_0.loadCoins();
    const _lockedValue = sc_0.loadCoins();
    const _nextItemIndex = sc_0.loadUintBig(256);
    const _collectionContent = sc_0.loadRef();
    const _itemContentUrlPrefix = sc_0.loadStringRefTail();
    const sc_1 = sc_0.loadRef().beginParse();
    const _royalty = loadRoyaltyParams(sc_1);
    return { $$type: 'NftCollectionTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadTupleNftCollectionTemplate$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _itemContentUrlPrefix = source.readString();
    const _royalty = loadTupleRoyaltyParams(source);
    return { $$type: 'NftCollectionTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function loadGetterTupleNftCollectionTemplate$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _nextItemIndex = source.readBigNumber();
    const _collectionContent = source.readCell();
    const _itemContentUrlPrefix = source.readString();
    const _royalty = loadGetterTupleRoyaltyParams(source);
    return { $$type: 'NftCollectionTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, nextItemIndex: _nextItemIndex, collectionContent: _collectionContent, itemContentUrlPrefix: _itemContentUrlPrefix, royalty: _royalty };
}

function storeTupleNftCollectionTemplate$Data(source: NftCollectionTemplate$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeNumber(source.nextItemIndex);
    builder.writeCell(source.collectionContent);
    builder.writeString(source.itemContentUrlPrefix);
    builder.writeTuple(storeTupleRoyaltyParams(source.royalty));
    return builder.build();
}

function dictValueParserNftCollectionTemplate$Data(): DictionaryValue<NftCollectionTemplate$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftCollectionTemplate$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNftCollectionTemplate$Data(src.loadRef().beginParse());
        }
    }
}

export type NftItemTemplate$Data = {
    $$type: 'NftItemTemplate$Data';
    owner: Address;
    staticTax: bigint;
    lockedValue: bigint;
    initialized: boolean;
    collection: Address;
    itemIndex: bigint;
    individualContent: Cell;
}

export function storeNftItemTemplate$Data(src: NftItemTemplate$Data) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.owner);
        b_0.storeCoins(src.staticTax);
        b_0.storeCoins(src.lockedValue);
        b_0.storeBit(src.initialized);
        b_0.storeAddress(src.collection);
        const b_1 = new Builder();
        b_1.storeUint(src.itemIndex, 256);
        b_1.storeRef(src.individualContent);
        b_0.storeRef(b_1.endCell());
    };
}

export function loadNftItemTemplate$Data(slice: Slice) {
    const sc_0 = slice;
    const _owner = sc_0.loadAddress();
    const _staticTax = sc_0.loadCoins();
    const _lockedValue = sc_0.loadCoins();
    const _initialized = sc_0.loadBit();
    const _collection = sc_0.loadAddress();
    const sc_1 = sc_0.loadRef().beginParse();
    const _itemIndex = sc_1.loadUintBig(256);
    const _individualContent = sc_1.loadRef();
    return { $$type: 'NftItemTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function loadTupleNftItemTemplate$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _initialized = source.readBoolean();
    const _collection = source.readAddress();
    const _itemIndex = source.readBigNumber();
    const _individualContent = source.readCell();
    return { $$type: 'NftItemTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function loadGetterTupleNftItemTemplate$Data(source: TupleReader) {
    const _owner = source.readAddress();
    const _staticTax = source.readBigNumber();
    const _lockedValue = source.readBigNumber();
    const _initialized = source.readBoolean();
    const _collection = source.readAddress();
    const _itemIndex = source.readBigNumber();
    const _individualContent = source.readCell();
    return { $$type: 'NftItemTemplate$Data' as const, owner: _owner, staticTax: _staticTax, lockedValue: _lockedValue, initialized: _initialized, collection: _collection, itemIndex: _itemIndex, individualContent: _individualContent };
}

function storeTupleNftItemTemplate$Data(source: NftItemTemplate$Data) {
    const builder = new TupleBuilder();
    builder.writeAddress(source.owner);
    builder.writeNumber(source.staticTax);
    builder.writeNumber(source.lockedValue);
    builder.writeBoolean(source.initialized);
    builder.writeAddress(source.collection);
    builder.writeNumber(source.itemIndex);
    builder.writeCell(source.individualContent);
    return builder.build();
}

function dictValueParserNftItemTemplate$Data(): DictionaryValue<NftItemTemplate$Data> {
    return {
        serialize: (src, builder) => {
            builder.storeRef(beginCell().store(storeNftItemTemplate$Data(src)).endCell());
        },
        parse: (src) => {
            return loadNftItemTemplate$Data(src.loadRef().beginParse());
        }
    }
}

 type NftItemTemplate_init_args = {
    $$type: 'NftItemTemplate_init_args';
    collection: Address;
    index: bigint;
}

function initNftItemTemplate_init_args(src: NftItemTemplate_init_args) {
    return (builder: Builder) => {
        const b_0 = builder;
        b_0.storeAddress(src.collection);
        b_0.storeInt(src.index, 257);
    };
}

async function NftItemTemplate_init(collection: Address, index: bigint) {
    const __code = Cell.fromHex('b5ee9c7241021c01000669000114ff00f4a413f4bcf2c80b01020162021203f8d0eda2edfb01d072d721d200d200fa4021103450666f04f86102f862ed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea9fa40810101d7005902d10170821005f5e100708200c353f8425260c705f2f4f8428816104510344130e208925f08e026d749c21fe30006f9011a031004f006d31f2182105fcc3d14ba8ece31d33ffa40fa40d2000191d4926d01e2fa00c821cf16c916151443306c1610ac109b108a10791068db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db31e02182102fcb26a2bae302218210d53276dbbae3022182101509a420ba0407090c03f4f8416f24308200c3513324be12f2f48200c35353e1c705f2f4535ac0008e1f383a288200c3530bc7051af2f48200c419226eb3f2f401206ef2d0807f4669923430e221c200935b3239e30d555170db3c708306700ac8018210d53276db58cb1fcb3fc9104b41301a10246d50436d03c8cf8580ca00cf8440ce01050b0600b470715447f3c85520821005138d915004cb1f12cb3f01cf1601d0cf16c9104541301d146d50436d5033c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0008004efa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb005514016631d33f01311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db310801dcf8416f2410235f0310685e341037487870db3c7083067f543a45c8552082108b7717355004cb1f12cb3fcbff01cf16c9104b41301a10246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055140b016631d33f01311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db310a01aa556070db3c707083060ac8018210d53276db58cb1fcb3fc9290450bb146d50436d4133c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0055050b0032f8416f24135f03f8276f1001a127a05367a0b60901a070fb0202828eb331fa0001311057104610354430db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db31e0018210946a98b6bae302060d0e003c368200c353f8425280c705f2f4f8428010c8cb05ce70cf0b6ec98042fb00018ad33f0131c8018210aff90f5758cb1fcb3fc91057104610354430f84201706ddb3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54db310f00a06d6d226eb3995b206ef2d0806f22019132e21024700304804250231036552212c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb0001a682f0158e394e7cc73a9aeb362957fe037665588aef16f3bd68580c13ab84097cf22aba8ea810465513db3cc87f01ca0055605076cf165004fa0258fa02ca0001cf1602c8cbffccc901ccc9ed54e05f07f2c0821100f0f8416f2410235f03278200c35302c705f2f48200c352f8276f105367a0bcf2f424c300965345a070fb02de7083067022c8018210d53276db58cb1fcb3fc92a553010246d50436d03c8cf8580ca00cf8440ce01fa028069cf40025c6e016eb0935bcf819d58cf8680cf8480f400f400cf81e2f400c901fb00020120131502afbe3ce76a268690000c70efd207d007d0069007d206a00e869ffea1808138813081288120811b60bc754fd20408080eb802c816880b8410802faf08038410061a9fc2129306382f97a7c21440b0822881a2098716d9e3638c1a14000225020120161902afb8fcfed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea9fa40810101d7005902d10170821005f5e100708200c353f8425260c705f2f4f8428816104510344130e2db3c6c7581a170104db3c18000a547312539302afbb95aed44d0d200018e1dfa40fa00fa00d200fa40d401d0d3ffd430102710261025102410236c178ea9fa40810101d7005902d10170821005f5e100708200c353f8425260c705f2f4f8428816104510344130e2db3c6c7181a1b00000008f8276f10d28ffad8');
    const builder = beginCell();
    builder.storeUint(0, 1);
    initNftItemTemplate_init_args({ $$type: 'NftItemTemplate_init_args', collection, index })(builder);
    const __data = builder.endCell();
    return { code: __code, data: __data };
}

export const NftItemTemplate_errors = {
    2: { message: `Stack underflow` },
    3: { message: `Stack overflow` },
    4: { message: `Integer overflow` },
    5: { message: `Integer out of expected range` },
    6: { message: `Invalid opcode` },
    7: { message: `Type check error` },
    8: { message: `Cell overflow` },
    9: { message: `Cell underflow` },
    10: { message: `Dictionary error` },
    11: { message: `'Unknown' error` },
    12: { message: `Fatal error` },
    13: { message: `Out of gas error` },
    14: { message: `Virtualization error` },
    32: { message: `Action list is invalid` },
    33: { message: `Action list is too long` },
    34: { message: `Action is invalid or not supported` },
    35: { message: `Invalid source address in outbound message` },
    36: { message: `Invalid destination address in outbound message` },
    37: { message: `Not enough Toncoin` },
    38: { message: `Not enough extra currencies` },
    39: { message: `Outbound message does not fit into a cell after rewriting` },
    40: { message: `Cannot process a message` },
    41: { message: `Library reference is null` },
    42: { message: `Library change action error` },
    43: { message: `Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree` },
    50: { message: `Account state size exceeded limits` },
    128: { message: `Null reference exception` },
    129: { message: `Invalid serialization prefix` },
    130: { message: `Invalid incoming message` },
    131: { message: `Constraints error` },
    132: { message: `Access denied` },
    133: { message: `Contract stopped` },
    134: { message: `Invalid argument` },
    135: { message: `Code of a contract was not found` },
    136: { message: `Invalid standard address` },
    138: { message: `Not a basechain address` },
} as const

export const NftItemTemplate_errors_backward = {
    "Stack underflow": 2,
    "Stack overflow": 3,
    "Integer overflow": 4,
    "Integer out of expected range": 5,
    "Invalid opcode": 6,
    "Type check error": 7,
    "Cell overflow": 8,
    "Cell underflow": 9,
    "Dictionary error": 10,
    "'Unknown' error": 11,
    "Fatal error": 12,
    "Out of gas error": 13,
    "Virtualization error": 14,
    "Action list is invalid": 32,
    "Action list is too long": 33,
    "Action is invalid or not supported": 34,
    "Invalid source address in outbound message": 35,
    "Invalid destination address in outbound message": 36,
    "Not enough Toncoin": 37,
    "Not enough extra currencies": 38,
    "Outbound message does not fit into a cell after rewriting": 39,
    "Cannot process a message": 40,
    "Library reference is null": 41,
    "Library change action error": 42,
    "Exceeded maximum number of cells in the library or the maximum depth of the Merkle tree": 43,
    "Account state size exceeded limits": 50,
    "Null reference exception": 128,
    "Invalid serialization prefix": 129,
    "Invalid incoming message": 130,
    "Constraints error": 131,
    "Access denied": 132,
    "Contract stopped": 133,
    "Invalid argument": 134,
    "Code of a contract was not found": 135,
    "Invalid standard address": 136,
    "Not a basechain address": 138,
} as const

const NftItemTemplate_types: ABIType[] = [
    {"name":"DataSize","header":null,"fields":[{"name":"cells","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bits","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"refs","type":{"kind":"simple","type":"int","optional":false,"format":257}}]},
    {"name":"StateInit","header":null,"fields":[{"name":"code","type":{"kind":"simple","type":"cell","optional":false}},{"name":"data","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"Context","header":null,"fields":[{"name":"bounceable","type":{"kind":"simple","type":"bool","optional":false}},{"name":"sender","type":{"kind":"simple","type":"address","optional":false}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"raw","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"SendParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"MessageParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"to","type":{"kind":"simple","type":"address","optional":false}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}}]},
    {"name":"DeployParameters","header":null,"fields":[{"name":"mode","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"body","type":{"kind":"simple","type":"cell","optional":true}},{"name":"value","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"bounce","type":{"kind":"simple","type":"bool","optional":false}},{"name":"init","type":{"kind":"simple","type":"StateInit","optional":false}}]},
    {"name":"StdAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":8}},{"name":"address","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"VarAddress","header":null,"fields":[{"name":"workchain","type":{"kind":"simple","type":"int","optional":false,"format":32}},{"name":"address","type":{"kind":"simple","type":"slice","optional":false}}]},
    {"name":"BasechainAddress","header":null,"fields":[{"name":"hash","type":{"kind":"simple","type":"int","optional":true,"format":257}}]},
    {"name":"ChangeOwner","header":2174598809,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"ChangeOwnerOk","header":846932810,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Deploy","header":2490013878,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"DeployOk","header":2952335191,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"FactoryDeploy","header":1829761339,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"cashback","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Excesses","header":3576854235,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"GetRoyaltyParams","header":1765620048,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportRoyaltyParams","header":2831876269,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"numerator","type":{"kind":"simple","type":"uint","optional":false,"format":16}},{"name":"denominator","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NFTTransfer","header":1607220500,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"customPayload","type":{"kind":"simple","type":"cell","optional":true}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"OwnershipAssigned","header":85167505,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"prevOwner","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"GetStaticData","header":801842850,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}}]},
    {"name":"ReportStaticData","header":2339837749,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"GetNftData","header":null,"fields":[{"name":"init","type":{"kind":"simple","type":"bool","optional":false}},{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collectionAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}},{"name":"individualContent","type":{"kind":"simple","type":"cell","optional":false}}]},
    {"name":"CollectionData","header":null,"fields":[{"name":"nextItemIndex","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"ownerAddress","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"RoyaltyParams","header":null,"fields":[{"name":"numerator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"denominator","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"destination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"Tep64TokenData","header":null,"fields":[{"name":"flag","type":{"kind":"simple","type":"uint","optional":false,"format":8}},{"name":"content","type":{"kind":"simple","type":"string","optional":false}}]},
    {"name":"SetStaticTax","header":352953376,"fields":[{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}}]},
    {"name":"UpgradeContract","header":288003337,"fields":[{"name":"queryId","type":{"kind":"simple","type":"int","optional":false,"format":257}},{"name":"code","type":{"kind":"simple","type":"cell","optional":true}},{"name":"data","type":{"kind":"simple","type":"cell","optional":true}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"MerkleProof","header":null,"fields":[{"name":"data","type":{"kind":"simple","type":"cell","optional":false}},{"name":"root","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"proof","type":{"kind":"dict","key":"uint","keyFormat":32,"value":"uint","valueFormat":256}},{"name":"proofLen","type":{"kind":"simple","type":"uint","optional":false,"format":32}}]},
    {"name":"MintNFT","header":3845502486,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"receiver","type":{"kind":"simple","type":"address","optional":false}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"forwardAmount","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"forwardPayload","type":{"kind":"simple","type":"cell","optional":false,"format":"remainder"}}]},
    {"name":"UpdateCollection","header":1218840839,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"responseDestination","type":{"kind":"simple","type":"address","optional":false}},{"name":"collectionContent","type":{"kind":"simple","type":"Tep64TokenData","optional":true}},{"name":"itemContentUrlPrefix","type":{"kind":"simple","type":"string","optional":true}},{"name":"royalty","type":{"kind":"simple","type":"RoyaltyParams","optional":true}}]},
    {"name":"NftItemInitForwardPayload","header":null,"fields":[{"name":"index","type":{"kind":"simple","type":"uint","optional":false,"format":256}}]},
    {"name":"ChangeCollectionOwner","header":3,"fields":[{"name":"queryId","type":{"kind":"simple","type":"uint","optional":false,"format":64}},{"name":"newOwner","type":{"kind":"simple","type":"address","optional":false}}]},
    {"name":"NftCollectionTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"nextItemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"collectionContent","type":{"kind":"simple","type":"cell","optional":false}},{"name":"itemContentUrlPrefix","type":{"kind":"simple","type":"string","optional":false}},{"name":"royalty","type":{"kind":"simple","type":"RoyaltyParams","optional":false}}]},
    {"name":"NftItemTemplate$Data","header":null,"fields":[{"name":"owner","type":{"kind":"simple","type":"address","optional":false}},{"name":"staticTax","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"lockedValue","type":{"kind":"simple","type":"uint","optional":false,"format":"coins"}},{"name":"initialized","type":{"kind":"simple","type":"bool","optional":false}},{"name":"collection","type":{"kind":"simple","type":"address","optional":false}},{"name":"itemIndex","type":{"kind":"simple","type":"uint","optional":false,"format":256}},{"name":"individualContent","type":{"kind":"simple","type":"cell","optional":false}}]},
]

const NftItemTemplate_opcodes = {
    "ChangeOwner": 2174598809,
    "ChangeOwnerOk": 846932810,
    "Deploy": 2490013878,
    "DeployOk": 2952335191,
    "FactoryDeploy": 1829761339,
    "Excesses": 3576854235,
    "GetRoyaltyParams": 1765620048,
    "ReportRoyaltyParams": 2831876269,
    "NFTTransfer": 1607220500,
    "OwnershipAssigned": 85167505,
    "GetStaticData": 801842850,
    "ReportStaticData": 2339837749,
    "SetStaticTax": 352953376,
    "UpgradeContract": 288003337,
    "MintNFT": 3845502486,
    "UpdateCollection": 1218840839,
    "ChangeCollectionOwner": 3,
}

const NftItemTemplate_getters: ABIGetter[] = [
    {"name":"get_nft_data","methodId":102351,"arguments":[],"returnType":{"kind":"simple","type":"GetNftData","optional":false}},
    {"name":"tonBalance","methodId":129370,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
    {"name":"staticTax","methodId":83868,"arguments":[],"returnType":{"kind":"simple","type":"int","optional":false,"format":257}},
]

export const NftItemTemplate_getterMapping: { [key: string]: string } = {
    'get_nft_data': 'getGetNftData',
    'tonBalance': 'getTonBalance',
    'staticTax': 'getStaticTax',
}

const NftItemTemplate_receivers: ABIReceiver[] = [
    {"receiver":"internal","message":{"kind":"typed","type":"NFTTransfer"}},
    {"receiver":"internal","message":{"kind":"typed","type":"GetStaticData"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Excesses"}},
    {"receiver":"internal","message":{"kind":"text","text":"withdraw"}},
    {"receiver":"internal","message":{"kind":"typed","type":"SetStaticTax"}},
    {"receiver":"internal","message":{"kind":"typed","type":"Deploy"}},
]

export const codeSenderAddressInvalid = 50000n;
export const codeInflowValueNotSufficient = 50001n;
export const codeBalanceNotSufficient = 50002n;
export const codeUnauthorized = 50003n;
export const codeNonceInvalid = 50004n;
export const codeNotImplemented = 50005n;
export const codeMsgValueInvalid = 50006n;
export const codeForwardPayloadInvalid = 50007n;
export const codeMerkleInvalid = 50008n;
export const codeMerkleInvalidNullCursor = 50009n;
export const codeMerkleInvalidNullRight = 50010n;
export const codeMerkleInvalidNullRoot = 50011n;
export const codeMerkleInvalidRoot = 50012n;
export const codeMerkleNotEnoughProof = 50013n;
export const codeNftIndexNotExists = 50200n;
export const codeNftCustomPayloadInvalid = 50201n;
export const codeRoyaltyNumInvalid = 50202n;

export class NftItemTemplate implements Contract {
    
    public static readonly storageReserve = 0n;
    public static readonly errors = NftItemTemplate_errors_backward;
    public static readonly opcodes = NftItemTemplate_opcodes;
    
    static async init(collection: Address, index: bigint) {
        return await NftItemTemplate_init(collection, index);
    }
    
    static async fromInit(collection: Address, index: bigint) {
        const __gen_init = await NftItemTemplate_init(collection, index);
        const address = contractAddress(0, __gen_init);
        return new NftItemTemplate(address, __gen_init);
    }
    
    static fromAddress(address: Address) {
        return new NftItemTemplate(address);
    }
    
    readonly address: Address; 
    readonly init?: { code: Cell, data: Cell };
    readonly abi: ContractABI = {
        types:  NftItemTemplate_types,
        getters: NftItemTemplate_getters,
        receivers: NftItemTemplate_receivers,
        errors: NftItemTemplate_errors,
    };
    
    constructor(address: Address, init?: { code: Cell, data: Cell }) {
        this.address = address;
        this.init = init;
    }
    
    async send(provider: ContractProvider, via: Sender, args: { value: bigint, bounce?: boolean| null | undefined }, message: NFTTransfer | GetStaticData | Excesses | "withdraw" | SetStaticTax | Deploy) {
        
        let body: Cell | null = null;
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'NFTTransfer') {
            body = beginCell().store(storeNFTTransfer(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'GetStaticData') {
            body = beginCell().store(storeGetStaticData(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Excesses') {
            body = beginCell().store(storeExcesses(message)).endCell();
        }
        if (message === "withdraw") {
            body = beginCell().storeUint(0, 32).storeStringTail(message).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'SetStaticTax') {
            body = beginCell().store(storeSetStaticTax(message)).endCell();
        }
        if (message && typeof message === 'object' && !(message instanceof Slice) && message.$$type === 'Deploy') {
            body = beginCell().store(storeDeploy(message)).endCell();
        }
        if (body === null) { throw new Error('Invalid message type'); }
        
        await provider.internal(via, { ...args, body: body });
        
    }
    
    async getGetNftData(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('get_nft_data', builder.build())).stack;
        const result = loadGetterTupleGetNftData(source);
        return result;
    }
    
    async getTonBalance(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('tonBalance', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
    async getStaticTax(provider: ContractProvider) {
        const builder = new TupleBuilder();
        const source = (await provider.get('staticTax', builder.build())).stack;
        const result = source.readBigNumber();
        return result;
    }
    
}