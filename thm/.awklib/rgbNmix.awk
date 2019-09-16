function hextorgb(HEX,NME){
	HEXR=substr(HEX,2,length(HEX)-5);
	HEXG=substr(HEX,4,length(HEX)-5);
	HEXB=substr(HEX,6,length(HEX)-5);
	print NME "RGB    " strtonum( "0x" HEXR ) ", " strtonum( "0x" HEXG ) ", " strtonum( "0x" HEXB );
	}

function mixer(NME,ONE,TWO,RT1,RT2){
	ONER=substr(ONE,2,length(ONE)-5);
	ONEG=substr(ONE,4,length(ONE)-5);
	ONEB=substr(ONE,6,length(ONE)-5);
	TWOR=substr(TWO,2,length(TWO)-5);
	TWOG=substr(TWO,4,length(TWO)-5);
	TWOB=substr(TWO,6,length(TWO)-5);
	ONRR=strtonum( "0x" ONER );
	ONRG=strtonum( "0x" ONEG );
	ONRB=strtonum( "0x" ONEB );
	TWRR=strtonum( "0x" TWOR );
	TWRG=strtonum( "0x" TWOG );
	TWRB=strtonum( "0x" TWOB );
	CL3R=int(((ONRR * RT1) / 100) + ((TWRR * RT2) / 100));
	CL3G=int(((ONRG * RT1) / 100) + ((TWRG * RT2) / 100));
	CL3B=int(((ONRB * RT1) / 100) + ((TWRB * RT2) / 100));
	CL3RX=sprintf( "%x", CL3R );
	CL3GX=sprintf( "%x", CL3G );
	CL3BX=sprintf( "%x", CL3B );
	print NME "RX=" CL3RX "\n" NME "GX=" CL3GX "\n" NME "BX=" CL3BX "";
	print NME "R="  CL3R  "\n" NME "G="  CL3G  "\n" NME "B="  CL3B "";
	}

function colmixnp(NME,ONE,TWO,RT1,RT2){
	ONER=substr(ONE,2,length(ONE)-5);
	ONEG=substr(ONE,4,length(ONE)-5);
	ONEB=substr(ONE,6,length(ONE)-5);
	TWOR=substr(TWO,2,length(TWO)-5);
	TWOG=substr(TWO,4,length(TWO)-5);
	TWOB=substr(TWO,6,length(TWO)-5);
	ONRR=strtonum( "0x" ONER );
	ONRG=strtonum( "0x" ONEG );
	ONRB=strtonum( "0x" ONEB );
	TWRR=strtonum( "0x" TWOR );
	TWRG=strtonum( "0x" TWOG );
	TWRB=strtonum( "0x" TWOB );
	CL3R=int((ONRR * RT1 + TWRR * RT2) / 100);
	CL3G=int((ONRG * RT1 + TWRG * RT2) / 100);
	CL3B=int((ONRB * RT1 + TWRB * RT2) / 100);
	CL3RX=sprintf( "%x", CL3R );
	CL3GX=sprintf( "%x", CL3G );
	CL3BX=sprintf( "%x", CL3B );
	}

