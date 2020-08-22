import {
	CreateNodecgInstance,
	CreateNodecgConstructor
} from 'ts-nodecg/browser';
// import { Configschema } from '../nodecg/generated/configschema';
import { ReplicantMap } from '../nodecg/replicants';
import { SpeedcontrolReplicantMap } from '../nodecg/speedcontrol';
import { SpeedcontrolAdditionsReplicantMap } from '../nodecg/speedcontrol-additions';
import { TwitterWidgetReplicantMap } from '../nodecg/nodecg-twitter-widget';
import { MessageMap } from '../nodecg/messages';

type SpeedcontrolInstance = CreateNodecgInstance<
	'nodecg-speedcontrol',
	{},
	SpeedcontrolReplicantMap,
	{},
	true
>

type SpeedcontrolConstructor = CreateNodecgConstructor<
	'nodecg-speedcontrol',
	{},
	SpeedcontrolReplicantMap,
	{},
	true
>

type AdditionsInstance = CreateNodecgInstance<
	'speedcontrol-additions',
	{},
	SpeedcontrolAdditionsReplicantMap,
	{},
	true
>

type AdditionsConstructor = CreateNodecgConstructor<
	'speedcontrol-additions',
	{},
	SpeedcontrolAdditionsReplicantMap,
	{},
	true
>

type TwitterWidgetInstance = CreateNodecgInstance<
	'nodecg-twitter-widget',
	{},
	TwitterWidgetReplicantMap,
	{},
	true
>

type TwitterWidgetConstructor = CreateNodecgConstructor<
	'nodecg-twitter-widget',
	{},
	TwitterWidgetReplicantMap,
	{},
	true
>

declare global {

	const nodecg: CreateNodecgInstance<
		'nagoya-bingo-layout',
		{},
		ReplicantMap,
		MessageMap
	>;

	const NodeCG: CreateNodecgConstructor<
		'nagoya-bingo-layout',
		{},
		ReplicantMap,
		MessageMap
	>;

}
